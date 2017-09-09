Feature: Blog
A site where you can publish your blog-posts.
Scenario: Approve a comment
Given I am an author user
And I have a blog-post
When I go to the blog-post page
And I press the Approve Comment button beside a comment
Then I should not see the error message
And the comment should be published on the blog-post # Note: will query the database
And the comment should be visible to all subsequent readers of the blog