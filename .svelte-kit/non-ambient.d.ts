
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/auth" | "/auth/google" | "/auth/google/callback" | "/dashboard" | "/groups" | "/groups/join" | "/groups/new" | "/groups/[groupId]" | "/groups/[groupId]/expenses" | "/groups/[groupId]/expenses/new" | "/groups/[groupId]/expenses/[expenseId]" | "/groups/[groupId]/expenses/[expenseId]/edit" | "/groups/[groupId]/settings" | "/login" | "/logout" | "/notifications" | "/signup";
		RouteParams(): {
			"/groups/[groupId]": { groupId: string };
			"/groups/[groupId]/expenses": { groupId: string };
			"/groups/[groupId]/expenses/new": { groupId: string };
			"/groups/[groupId]/expenses/[expenseId]": { groupId: string; expenseId: string };
			"/groups/[groupId]/expenses/[expenseId]/edit": { groupId: string; expenseId: string };
			"/groups/[groupId]/settings": { groupId: string }
		};
		LayoutParams(): {
			"/": { groupId?: string | undefined; expenseId?: string | undefined };
			"/auth": Record<string, never>;
			"/auth/google": Record<string, never>;
			"/auth/google/callback": Record<string, never>;
			"/dashboard": Record<string, never>;
			"/groups": { groupId?: string | undefined; expenseId?: string | undefined };
			"/groups/join": Record<string, never>;
			"/groups/new": Record<string, never>;
			"/groups/[groupId]": { groupId: string; expenseId?: string | undefined };
			"/groups/[groupId]/expenses": { groupId: string; expenseId?: string | undefined };
			"/groups/[groupId]/expenses/new": { groupId: string };
			"/groups/[groupId]/expenses/[expenseId]": { groupId: string; expenseId: string };
			"/groups/[groupId]/expenses/[expenseId]/edit": { groupId: string; expenseId: string };
			"/groups/[groupId]/settings": { groupId: string };
			"/login": Record<string, never>;
			"/logout": Record<string, never>;
			"/notifications": Record<string, never>;
			"/signup": Record<string, never>
		};
		Pathname(): "/" | "/auth/google" | "/auth/google/callback" | "/dashboard" | "/groups/join" | "/groups/new" | `/groups/${string}` & {} | `/groups/${string}/expenses/new` & {} | `/groups/${string}/expenses/${string}/edit` & {} | `/groups/${string}/settings` & {} | "/login" | "/logout" | "/notifications" | "/signup";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}