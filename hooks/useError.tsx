"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useMemo, useState } from "react";

const useError = () => {
	const [errorMessage, setErrorMessage] = useState<null | string>(null);

	useEffect(() => {
		if (errorMessage) {
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	}, [errorMessage]);

	const errorMessageBlock = useMemo(() => {
		return () => {
			if (errorMessage === null) return <></>;

			return (
				<Alert className="mb-5" variant="destructive">
					<AlertTitle>Error!</AlertTitle>
					<AlertDescription>{errorMessage}</AlertDescription>
				</Alert>
			);
		};
	}, [errorMessage]);

	return { setErrorMessage, errorMessageBlock };
};

export default useError;
