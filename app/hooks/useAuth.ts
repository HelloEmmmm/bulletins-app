import {useEffect} from "react";
import {useRouter} from "next/navigation";

export const useAuth = () => {

    const router = useRouter();

    useEffect(() => {

    }, [router]);

    return 1;
}