declare global { namespace App { interface Locals { user: { id: string; name: string; email: string } | null; } interface PageData { user: App.Locals['user']; } } }
export {};
