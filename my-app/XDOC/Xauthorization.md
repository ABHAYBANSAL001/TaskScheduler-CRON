# Twitter (X) Media Upload – Investigation & Findings

This document explains **everything that was tried** to upload media (images) to Twitter (X), **why it failed**, and the **final verified conclusion**.

For x media uplaod we need oauth permission with the access token and secret
and for message we are using oauth

---

## Goal

Post a tweet **with images** using the Twitter (X) API from a Next.js application.

Target flow:

```
Upload image → get media_id → post tweet with media_id
```

---

## Initial Setup

### Tech Stack

- Next.js (App Router)
- Node.js workers (QStash)
- Prisma + PostgreSQL
- `twitter-api-v2` library
- OAuth tokens stored encrypted in DB

### Relevant Paths

- **Worker:** `app/api/workers/twitter/route.ts`
- **Test API:** `app/api/test-twitter-media/route.ts`

---

## What Works (Confirmed)

### Posting text-only tweets

- **API:** Twitter API v2
- **Auth:** OAuth 2.0 (PKCE)

**Endpoint:**

```
POST https://api.twitter.com/2/tweets
```

**Auth used:**

```
Authorization: Bearer <OAuth2 Access Token>
```

- ✅ Text tweets work correctly
- ❌ Media cannot be attached

---

## Attempt 1: Upload media using Twitter API v2

**Tried:**

```ts
POST /2/tweets
media: { media_urls: [...] }
```

**Result:**

- ❌ Not supported by Twitter
- Twitter **does not allow** external image URLs
- Twitter **does not allow** base64 images in v2

**Conclusion:** Media upload is **not supported** in API v2.

---

## Attempt 2: Upload media via v1.1 using Bearer token

**Endpoint:**

```
POST https://upload.twitter.com/1.1/media/upload.json
```

**Auth:**

```
Authorization: Bearer <OAuth2 token>
```

**Result:**

```
401 Unauthorized
Unsupported Authentication
```

**Why it failed:** Media upload **requires OAuth 1.0a**. Bearer tokens (OAuth 2.0) are rejected.

---

## Attempt 3: Manual multipart/form-data upload

**Code tried:**

- Fetch image from S3 / UploadThing
- Convert to buffer
- Send `multipart/form-data` to `media/upload.json`

**Result:**

```
401 - Twitter code 89
```

**Why it failed:** OAuth 1.0a signature was missing. OAuth 2.0 tokens cannot sign v1.1 requests.

---

## Attempt 4: Using `twitter-api-v2` library

**Library:** `twitter-api-v2@^1.29.0`

**Tried:**

```ts
client.v1.uploadMedia(buffer);
```

**Result:**

```
401 - Invalid or expired token (code 89)
```

**Important discovery:**

- `twitter-api-v2` internally uses **v1.1**
- It **requires** OAuth 1.0a Access Token + Secret
- OAuth 2.0 tokens do **not** work

---

## OAuth Investigation

### Tokens available in Developer Portal

The **Keys and Tokens** page shows:

- API Key & Secret
- Bearer Token (OAuth 2.0)
- OAuth 2.0 Client ID & Secret
- Access Token and Secret

The Access Token section displayed:

```
Access Token and Secret
Created with Read Only permissions
```

---

## Permissions Investigation

### User Authentication Settings

**Path:** `Developer Portal → App → User authentication`

**Configured:**

- ✅ OAuth 1.0a enabled
- ✅ App permissions set to **Read and Write**

**However**, after revoking and regenerating tokens, restarting the server, and re-copying env values:

- ❌ Access Token & Secret **always** regenerated as **Read Only**

---

## Final Discovery (Critical)

### Free Developer Account Limitation (Current X Policy)

On **FREE X Developer accounts**:

- OAuth 1.0a Access Tokens are **forced to Read Only**
- This persists even if the UI shows "Read and Write"
- Regenerated tokens remain Read Only
- Media upload endpoints are blocked

This is the reason behind:

```
401 - Twitter code 89
```

> ⚠️ This is **NOT** a bug and **NOT** a code issue. It is a platform-level restriction.

---

## Final Conclusion

### Can media be uploaded on a free account?

❌ **No.**

Media upload requires all three of the following:

1. OAuth 1.0a
2. Read & Write permissions
3. **Paid X Developer plan (Basic or higher)**

---

## What Still Works on Free Plan

| Feature            | Status |
| ------------------ | ------ |
| OAuth 2.0 login    | ✅     |
| Text-only tweets   | ✅     |
| Reading tweets     | ✅     |
| Media upload       | ❌     |
| Tweet with image   | ❌     |
| Video / GIF upload | ❌     |

---

## Why the Code Is Correct

- Media upload flow is correct
- API endpoints are correct
- `twitter-api-v2` usage is correct
- Error handling is correct

**Platform restrictions are the blocker, not the implementation.**

---

## Final Architecture Decision

### Supported on Free Plan

- Text-only Twitter posts
- OAuth 2.0 (PKCE)
- Scheduler logic remains valid

### Requires Paid Plan

- Images
- Videos
- GIFs
- Full Buffer-style posting

---

## Recommendation

**If media posting is required:**

- Upgrade to **X Developer Basic**
- No code changes needed
- Existing media upload logic will work immediately once upgraded

**If staying on free plan:**

- Disable media upload for Twitter
- Show a clear UI message to the user:

> _"Media posting requires an X Developer paid plan."_

---

## TL;DR

```
Twitter media upload
→ requires OAuth 1.0a
→ requires Read & Write
→ requires paid developer account
```
