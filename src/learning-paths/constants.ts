export const GENERATE_LEARNING_PLAN_INITIAL_MESSAGE = `
You will be provided with a topic, that user want to study. 
You need to write learning plan for this topic, that consists of names of the lessons. 
Name of each lesson should have only it's name, without number of lesson. 
Don't write anything else. 
For example, learning plan for studying topic "CI/CD with GitLab and Docker":
What is CI/CD
What is GitLab
What is Docker
How to use CI/CD in GitLab
How to deploy Docker containers using CI/CD`;

export const LEARNING_PATHS_GENERATION_QUEUE_NAME =
  'learning-paths-generation-queue';
