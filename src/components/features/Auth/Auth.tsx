/* eslint-disable prefer-template */
// * КОМПОНЕНТ ИСПОЛЬЗУЕТ js-cookie // npm i js-cookie -S
// А так же nextui-org/react // npm i nextui-org/react -S

"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
//import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
//import { getAuthData } from "@/components/entities/Auth/authAction";
import { Button, Card, CardBody } from "@nextui-org/react";

const WIDGET_URL = "https://passport.lichi.one/auth.php";

const PassportLichiOne = () => {
	let newTab: Window | null;

	const auth = async (clientId: string, scopes: string[]) => {
		scopes.forEach((scope: string) => {
			if (scope.charAt(0) === "!") {
				scope = scope.slice(1);
			}
		});
		//a.gomozov@corp.lichi.com
		//ceemvxvcfg

		const params = new URLSearchParams({
			window: window.location.origin,
			scope: scopes.join(","),
			// eslint-disable-next-line camelcase
			client_id: clientId,
		});

		// Пытаемся открыть новую вкладку с URL, содержащим параметры
		newTab = window.open(
			WIDGET_URL + "?" + params.toString(),
			"_blank" // Используйте "_blank" для открытия в новой вкладке
		);
	};

	const handleMessage = (e: MessageEvent): void => {
		if (e.origin !== "https://passport.lichi.one") {
			return;
		}
		window.dispatchEvent(
			new CustomEvent("passport:auth", {
				detail: e.data.auth_data ?? null,
			})
		);

		const authData = e.data.auth_data ?? null;

		if (authData) {
			// Отправляем сообщение об успешной авторизации родительской странице
			window.parent.postMessage({ type: "passport:auth", authData }, "*");
		}
	};

	useEffect(() => {
		const onEvent = (
			type: string,
			listener: EventListenerOrEventListenerObject,
			options?: boolean | AddEventListenerOptions
		) => {
			window.addEventListener(type, listener, options);
			newTab?.close();
		};

		const messageEvent = "message";

		onEvent(messageEvent, handleMessage as EventListener, { capture: false });

		return () => {
			onEvent(messageEvent, handleMessage as EventListener, { capture: false });
		};
	}, []);

	const onAuth = useCallback((cb: (data: any) => void) => {
		const handleAuth = (e: CustomEvent) => {
			cb(e.detail);
		};

		window.addEventListener("passport:auth", handleAuth as EventListener);

		return () => {
			window.removeEventListener("passport:auth", handleAuth as EventListener);
		};
	}, []);

	return { auth, onAuth };
};

export const AuthPage = (): JSX.Element => {
	const router = useRouter();
	//	const dispatch = useAppDispatch();
	const passportLichiOne = PassportLichiOne();

	return (
		<div style={{ display: "flex", alignItems: "center" }}>
			<Card className="max-w-[400px] w-[100%] min-h-[300px]">
				<CardBody className="h-[300px]">
					<div className="flex items-center justify-around w-full h-full flex-col">
						<div>
							<p className="text-[28px]">Authorization</p>
							<p className="text-[10px] text-center tracking-widest">
								[PASSPORT.LICHI.ONE]
							</p>
						</div>

						<span className="text-center">
							Для завершения авторизации нажмите нажмите на кнопку ниже
						</span>
						<Button
							variant="flat"
							className="text-white text-[15px] h-[40px] w-[fit-content] bg-black border-2 border-black border-solid  transition  first:text-white"
							type="button"
							onClick={() => {
								if (!Cookies.get("user")?.length) {
									// Проверяем куки на токен. Если нет то начинаем авторизацию
									// Тут используем клиент ID
									passportLichiOne.auth(
										"eaf87c33-aed2-11ee-b2f9-047c161d9655",
										["user.name", "!user.department", "!user.group_access"]
									);
								}

								passportLichiOne.onAuth((authData) => {
									console.log("authData", authData);
									// Тут юзаем дату с колбека для авторизации сессии в метод
									dispatch(
										getAuthData({ method: "system.auth", ...authData })
									).then((item: { payload: string }) => {
										if (item.payload) {
											const expires = 0.5;
											Cookies.set("user", item.payload, { expires, path: "/" });
										}
										setTimeout(() => {
											router.replace("/");
										}, 200);
									});
								});
							}}
						>
							Авторизуйтесь
						</Button>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};
