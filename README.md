# Validate Azure AD Token

[![npm](https://img.shields.io/npm/v/validate-azure-ad-token.svg)](https://www.npmjs.com/package/validate-azure-ad-token)
![types](https://img.shields.io/badge/types-typescript%20%7C%20flow-blueviolet)
[![minzip](https://img.shields.io/bundlephobia/minzip/validate-azure-ad-token.svg)](https://www.npmjs.com/package/validate-azure-ad-token)
[![downloads per month](https://img.shields.io/npm/dm/validate-azure-ad-token.svg)](https://www.npmjs.com/package/validate-azure-ad-token)
[![issues](https://img.shields.io/github/issues/playerony/validate-azure-ad-token.svg)](https://www.npmjs.com/package/validate-azure-ad-token)
[![license](https://img.shields.io/github/license/playerony/validate-azure-ad-token)](https://www.npmjs.com/package/validate-azure-ad-token)

This is a function that can be used to validate an access token received from Azure Active Directory. It is particularly useful when you're using a MSAL library to authenticate users on the frontend and you want to verify Microsoft tokens in the API.

# Documentation

For more information about the required props to validate your token and the library itself, please refer to the **[API Documentation](https://playerony.github.io/validate-azure-ad-token)**

# Installation

```js
  yarn add validate-azure-ad-token
  npm install validate-azure-ad-token
```

# Validation Steps

1. Verify if all required props are passed in.
2. Decode the token using the **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** library.
3. Send a request to `https://login.microsoftonline.com/{tenantId}/discovery/keys?appid={applicationId}` to receive all public keys unique to your `applicationId` and `tenantId`. This action is cached after one successful attempt.
4. Verify all required access token claims: `aud`, `tid`,`iss`,`scp`, `appid`, `exp`.
5. If the comparison succeeds, the token is valid.

# Example

```js
const validate = require('validate-azure-ad-token').default;

try {
  const decodedToken = await validate('YOUR_MICROSOFT_ACCESS_TOKEN', {
    tenantId: 'YOUR_TENANT_ID',
    audience: 'YOUR_AUDIENCE_ID',
    applicationId: 'YOUR_APPLICATION_ID',
    scopes: 'YOUR_SCOPES', // for example ["User.Read"]
  });

  // DO WHATEVER YOU WANT WITH YOUR DECODED TOKEN
} catch (error) {
  // ALL ERRORS GONNA SHOW HERE AS A STRING VALUE
}
```

# Usage

If you are using a **[@azure/msal-react](https://www.npmjs.com/package/@azure/msal-react)** or **[@azure/msal-browser](https://www.npmjs.com/package/@azure/msal-browser)** on the frontend site and you want to verify your Microsoft access token on your node server.

# License

This project is licensed under the MIT License - see the LICENSE file for details.
