Markdown
# RESTful API Activity - Vienna A. Villaruel
## Best Practices Implementation 

**1. Environment Variables;**
Why did we put `BASE_URI` in env instead of hadcoding it?
-It is because instead of hadcoding it, `BASE_URI` is the one who will call a path and fix the root address for API request. It also use to avoid repetiton of URLs. 

**2. Resource Modeling:**
-Why did we plural nouns(e.g., `/dishes`) for our routes?
-Instead of representing a single thing, it symbolizes a group of resources. 

**3. Status Code**
When do we use `201 Created' vs '200 OK`?
Why is it important to return `404` instead of just an empty array or a genetic error?
-We use `201 Created` to add new resources to the server, while `200 OK` is when requesting where there's no new resources in the server. The important of indicating the `4041 instead of an empty array is to provide the clarification to anyone using about the nature of the error, it also to clarify them that the resources are not found. 

**Testing**
- (Paste a screenshot of a successful GET request here)

