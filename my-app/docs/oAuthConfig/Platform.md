---

# 🧠 First understand: what OAuth actually is

OAuth means:

> “Let user give permission without sharing password.”

You never get the user’s X password.
X only gives you **permission tokens**.

---

# 🔁 Real-life example

Think like this:

- You want to post on X
- User already logged into X
- X says:

  > “Okay, but ask the user first.”

So OAuth flow starts.

---

# ✅ What you finally want

After OAuth success, you want:

- access_token
- refresh_token
- X user id
- permission to post tweets

---

# 🔥 Step-by-step full OAuth flow (very important)

## STEP 1️⃣ — You create an app on X Developer Portal

Why?

Because X must know **who is asking permission**.

You get:

- Client ID
- Client Secret

These identify _your app_, not the user.

---

## STEP 2️⃣ — User clicks “Connect X”

On your dashboard:

```
[ Connect with X ]
```

User action starts OAuth.

---

## STEP 3️⃣ — You redirect user to X

Your backend sends user to:

```
https://twitter.com/i/oauth2/authorize?
  client_id=XXXX
  &redirect_uri=YOUR_CALLBACK
  &scope=tweet.read tweet.write users.read offline.access
  &response_type=code
```

What happens here?

👉 X shows a screen:

> “Schedulr wants to access your account
> Allow or deny?”

---

## STEP 4️⃣ — User clicks Allow

X does **NOT** send token yet.

Instead it sends:

```
authorization_code
```

Back to your app:

```
/api/x/callback?code=abc123
```

Why?

Because code is safer than token.

---

## STEP 5️⃣ — Your backend exchanges code for token

Now your SERVER talks to X:

```
POST https://api.twitter.com/2/oauth2/token
```

With:

- client_id
- client_secret
- code
- redirect_uri

X responds:

```json
{
  "access_token": "...",
  "refresh_token": "...",
  "expires_in": 7200
}
```

🔥 This step must happen on server.

Never frontend.

---

## STEP 6️⃣ — You store tokens in DB

You store:

- access_token
- refresh_token
- expires_at
- twitter_user_id

Linked to your user.

Now user is “connected”.

---

## STEP 7️⃣ — Later when scheduling post

When user schedules a post:

```
POST /api/post-to-x
```

Your server:

- fetches user's X token
- refreshes if expired
- posts tweet using API

User does nothing.

---

# 🧠 That’s the whole OAuth story

```
User → X permission → Code → Token → Store → Use later
```

---

# 🔐 Why refresh token is important

Access token expires quickly.

Refresh token lets you:

- post later
- schedule posts
- background jobs

Without refresh token → scheduling impossible.

---

# ⚠️ Important scopes for X

You need:

```
tweet.read
tweet.write
users.read
offline.access   ← VERY IMPORTANT
```

Without `offline.access`:
❌ no refresh token
❌ cannot schedule posts

---

# 🔥 Very important rule

> OAuth tokens always belong to **server**, never client.

Frontend never sees them.

---

# 🧠 Simple diagram

```
User
 ↓ click connect
Your App
 ↓ redirect
X OAuth Screen
 ↓ allow
Your Callback API
 ↓ exchange code
X Token API
 ↓ token
Database
```

---

# ✅ How this fits your app (Schedulr)

You already have:

- users
- dashboard
- scheduled posts

Now you add:

### Table: ConnectedAccount

```prisma
model ConnectedAccount {
  id              String   @id @default(cuid())
  userId          String
  provider        String   // "x"
  accessToken     String
  refreshToken    String
  expiresAt       DateTime
}
```

---

# 🧠 When user deletes account

You also revoke tokens.

Clean.

---

# 🔥 Final one-liner (remember forever)

> OAuth is not login.
> OAuth is permission.

---
