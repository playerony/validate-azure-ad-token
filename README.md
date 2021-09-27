# Validate azure active directory token

[![npm](https://img.shields.io/npm/v/validate-azure-ad-token.svg)](https://www.npmjs.com/package/validate-azure-ad-token)

![types](https://img.shields.io/badge/types-typescript%20%7C%20flow-blueviolet)

[![minzip](https://img.shields.io/bundlephobia/minzip/validate-azure-ad-token.svg)](https://www.npmjs.com/package/validate-azure-ad-token)

[![downloads per month](https://img.shields.io/npm/dm/validate-azure-ad-token.svg)](https://www.npmjs.com/package/validate-azure-ad-token)

[![issues](https://img.shields.io/github/issues/playerony/validate-azure-ad-token.svg)](https://www.npmjs.com/package/validate-azure-ad-token)

[![license](https://img.shields.io/github/license/playerony/validate-azure-ad-token)](https://www.npmjs.com/package/validate-azure-ad-token)

Function to validate access token received from azure active directory. Useful when you're using a msal library to authenticate users on the frontend and you wanna verify Microsoft tokens in the API.

# documentation

If you want to get more information about required props to validate your token and the library itself, just take a look at markdown documentation: **[API Documentation](https://playerony.github.io/validate-azure-ad-token)**

# validation steps

1. Verify if all required props are passed in,
2. Decode token with **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** library,
3. Send request to `https://login.microsoftonline.com/{tenantId}/discovery/keys?appid={applicationId}` to receive all public keys unique only for your `applicationId` and `tenantId` props. THIS ACION IS CACHED - AFTER ONE SUCCESSFUL ATTEMTP.
4. Verify all required token claims: `aud`, `tid`,`iss`,`scp`, `appid`.
5. The above steps are a guarantee that the token belongs to us and can be successfully sent to Microsoft's graph API. To `https://graph.microsoft.com/v1.0/me`.
6. After successful attempt user id received from graph api is compared with this one from token payload.
7. You token is valid!

# example

```js
import validate from 'validate-azure-ad-token';

try {
	const decodedToken = validate('YOUR_MICROSOFT_TOKEN', {
		tenantId: 'YOUR_TENANT_ID'
		audience: 'YOUR_AUDIENCE_ID',
		applicationId: 'YOUR_APPLICATION_ID',
		scopes: 'YOUR_SCOPES' // for example ["User.Read"]
	})

	// DO WHATEVER YOU WANT WITH YOUR DECODED TOKEN
} catch (error: unknown) {
	// ALL ERRORS GONNA SHOW HERE
}

```

# usage

If you are using a **[@azure/msal-react](https://www.npmjs.com/package/@azure/msal-react)** or **[@azure/msal-browser](https://www.npmjs.com/package/@azure/msal-browser)** on the frontend site and you just want to verify your Microsoft access token on your node server.

# license

MIT
