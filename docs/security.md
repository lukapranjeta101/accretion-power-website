# Future security implementation requirements

The following requirements must be implemented and verified in later development. They are not implemented by this scaffold. Folder organization alone does not secure an application.

- Use an established authentication provider or library.
- Verify sessions, permissions, and record ownership on the backend.
- Ensure customers can access only their own private records.
- Require server-enforced roles for admin access.
- Validate inputs and recalculate estimate totals on the backend.
- Save the prices used when each estimate is submitted.
- Never expose internal pricing or privileged secrets to the frontend.
- Never commit real credentials.
- Store private documents outside public directories.
- Keep sensitive data out of logs.
- Implement abuse protection, secure sessions, and recovery flows before launch.

Frontend visibility is not access control. Browser-exposed configuration is public. Backend secrets belong in local environment files or deployment secret storage.
