# Role Revocation

Citizen iD ensures that Discord roles granted through Linked Roles always reflect your current verification status.
If your RSI verification is withdrawn—either manually or automatically—any roles tied to that verification will be removed without requiring intervention from server administrators.

Role revocation can occur for several reasons:
- manual withdrawal of RSI verification through your Citizen iD dashboard,
- an automated withdrawal triggered by changes to your RSI account handle, which makes the original verification invalid,
- necessary moderator actions, such as when a user is temporarily or permanently blocked from using the Citizen iD service.

In all cases, Citizen iD immediately informs Discord to remove the linked role, preventing outdated or incorrect permissions from persisting.

You can easily claim the roles back if your verification is restored; such as by completing the verification process again with your updated RSI handle.
This process is identical to the original claiming procedure described in [Linked Roles](./linked-roles.md).

By automating revocation, Citizen iD helps communities maintain accurate access control while removing the burden of manual role management from server staff.

---

*Last updated: August 2025*
