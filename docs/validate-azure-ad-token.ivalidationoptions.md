<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [validate-azure-ad-token](./validate-azure-ad-token.md) &gt; [IValidationOptions](./validate-azure-ad-token.ivalidationoptions.md)

## IValidationOptions interface

The interface represents required fields to process access token validation

**Signature:**

```typescript
export interface IValidationOptions 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [applicationId](./validate-azure-ad-token.ivalidationoptions.applicationid.md) |  | string | Only present in v1.0 tokens. The application ID of the client using the token. The application can act as itself or on behalf of a user. The application ID typically represents an application object, but it can also represent a service principal object in Azure AD. |
|  [audience](./validate-azure-ad-token.ivalidationoptions.audience.md) |  | string | Identifies the intended recipient of the token - its audience. In v2.0 tokens, this is always the client ID of the API, while in v1.0 tokens it can be the client ID or the resource URI used in the request, depending on how the client requested the token. |
|  [scopes](./validate-azure-ad-token.ivalidationoptions.scopes.md) |  | string\[\] | The set of scopes exposed by your application for which the client application has requested (and received) consent. |
|  [tenantId](./validate-azure-ad-token.ivalidationoptions.tenantid.md) |  | string | Your Microsoft 365 tenant ID is a globally unique identifier (GUID) that is different than your organization name or domain. |

