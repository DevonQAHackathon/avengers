Feature: Blog
A site where you can publish your blog-posts.
Scenario: Add a draft blog-post
Given I am an author user
And I have a blog-post
When I go to the blog-post page
And I press the Save as Draft button
Then I should not see the error message
And the blog-post should be saved as a draft  # Note: will query the database
And the blog-post should NOT be published