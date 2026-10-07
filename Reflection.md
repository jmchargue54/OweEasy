# Planning Reflection

The hardest area to make testable was the balances settlements because balances, deleted expenses, automatic balance changes, and settlements all need to match. 
AI kept addnig features like custom splits, exports, recurring expenses, external payments, and notifications.
The dependency that changed the implementation order was that expenses needed to be created or added before balances could be calculated. 
Planning showed early on that authorization must be checked in the API, not just on the website. It also showed that making the site work well on all screen sizes should be planned separately instead of waiting until the end. CPutting the plans together made the implementation sequence easier to understand while keeping the smaller taks included.
