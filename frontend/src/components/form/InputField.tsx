"use client";

type Props = {
    label: string;
    value: string | number;
    onChange?: (value: string | number) => void;
    type?: "text" | "number" | "email"| "password" | "textarea";
    required?: boolean;
    placeholder?: string;
    readOnly?: boolean;
};

export default function InputField({
                                       label,
                                       value,
                                       onChange,
                                       type = "text",
                                       required = false,
                                       placeholder,
                                       readOnly = false,
                                   }: Props) {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (!onChange) return;
        const val = type === "number" ? Number(e.target.value) : e.target.value;
        onChange(val);
    };

    const commonClasses =
        "w-full px-3 py-2 rounded-md border outline-none transition bg-[var(--input)] border-[var(--border)]" +
        (readOnly
            ? " opacity-75 cursor-not-allowed"
            : " focus:ring-2 focus:ring-blue-500");

    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            {type === "textarea" ? (
                <textarea
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={readOnly}
                    className={commonClasses}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={readOnly}
                    className={commonClasses}
                />
            )}
        </div>
    );
}
