import {InputProps} from "@/app/components/LoginInput/interface";

export const LoginInput = (props: InputProps) => {
    const {label, value, onChange} = props;

    return (
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <input
                {...props}
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={`请输入${label}`}/>
        </div>
    )
}