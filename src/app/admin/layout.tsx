"use client";

import * as React from "react";
import { StoreProvider } from "@/components/providers/StoreProvider";
import NavBarAdmin from "@/components/widgets/admin/NavBarAdmin/ui/NavBarAdmin";
import { ToasterMessage } from "@/components/shared/ui/Toaster";
import { Modals } from "../../components/widgets/admin/Modals";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<div className="adminPages">
			<StoreProvider>
				<NavBarAdmin>
					<>
						<ToasterMessage />
						<Modals />
						{children}
					</>
				</NavBarAdmin>
			</StoreProvider>
		</div>
	);
}
