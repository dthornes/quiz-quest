require("tsconfig-paths").register({
	baseUrl: "./",
	paths: {
		"@/*": ["*"],
	},
});

// TODO: Manage .env loading
require("dotenv").config({ path: `.env.local`, override: true });
