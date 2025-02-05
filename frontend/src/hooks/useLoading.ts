import { useState } from "react";

export function useLoading() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const load = (aPromise: Promise<any>) => {
        setIsLoading(true);
        return aPromise.finally(() => setIsLoading(false));
    };
    return [isLoading, load] as const;
}