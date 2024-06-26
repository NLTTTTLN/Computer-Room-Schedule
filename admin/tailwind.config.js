module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primaryRed: "var(--color-primaryRed)",
                // green: "var(--color-green)",
                primary: "var(--color-primary)",
            },
            backgroundColor: {
                
                bgPrimary: "var(--color-bg-primary)",
                bgSecondary: "var(--color-bg-secondary)",
            },
            textColor: {
                textPrimary: "var(--color-text-primary)",
                textSecondary: "var(--color-text-secondary)",
            },
        },
    },
    plugins: [],
};
