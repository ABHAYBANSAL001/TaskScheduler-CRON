# Twitter Posting Worker

**File:** `app/api/workers/twitter/route.ts`

This worker posts tweets on a schedule. It uses **two auth methods** depending on what it's doing.

---

## How Auth Works

### ✅ Text Tweets → OAuth 2.0 (works on free)

```
POST https://api.twitter.com/2/tweets
Auth: Bearer <OAuth2 Access Token>
```

```ts
await client.v2.tweet({ text: task.content });
```

Tokens stored: `encryptedAccessToken`, `encryptedRefreshToken`

---

### ❌ Media Upload → OAuth 1.0a (needs paid plan)

```
POST https://upload.twitter.com/1.1/media/upload.json
Auth: OAuth 1.0a signature
```

```ts
await client.v1.uploadMedia(buffer, { mimeType: "image/jpeg" });
```

Needs: OAuth 1.0a Access Token + Secret with **Read & Write** permissions.

---

## Why Media Doesn't Work on Free

On a **free X Developer account**, Twitter forces OAuth 1.0a tokens to **Read Only** — no matter what you set in the portal. This blocks media upload and returns:

```
401 – Twitter error code 89
```

This is a **platform limitation**, not a code bug.

---

## What Works Where

| Feature          | Free Plan | Paid Plan |
| ---------------- | --------- | --------- |
| Text-only tweets | ✅        | ✅        |
| Token refresh    | ✅        | ✅        |
| Image upload     | ❌        | ✅        |
| Tweet with media | ❌        | ✅        |

---

## Upgrading Later

No code changes needed. When you upgrade to a **paid X Developer plan**, media upload will just start working automatically.

```
Free  →  text only
Paid  →  text + images
```
