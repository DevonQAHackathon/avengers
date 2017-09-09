# (Q)Avengers

![QAvengers logo](docs/resources/QAvengers.png/?raw=true)

A team of bots/modules to assist QA activities all the way from test plan creation to execution and reporting.

## The (Q)Avengers initiative consists of...

![QAvengers logo](docs/resources/QAvengers-flow.png/?raw=true)

1. **Captain America** -  Interact with user to obtain business requirements and generate high quality feature-specifications.
2. **Iron Man** - Create tests from the high-quality feature specs.
3. [TODO] **The Hulk** - Submit generated tests to test-repo for review/maintenance.
4. [TODO] **Thor** - Executing the tests in the test-repo and storing the results.
5. [TODO] **Black widow** - Test Report generation based on the results of a test-run.

# Goals of (Q)Avengers

1. **Simplify** QA activities by eliminating redundant manual steps all the way from the beginning of reviewing business requirements, generating testplans, executing the tests, gathering results and providing insightful metrics on the state of the system.

2. **Extensiblility** - The impelmentation should be capable on handling a large number of parallel users.
  * This is achieved by instantiating multiple independent instances of any module when needed as they are modular in design.
  * Depending on the available infrastructure, it is also possible to enhance any module by external inputs / trained model that can be offloaded to a common high-perfomance hw-accelrated instance. 

3. **Re-Usable** - Modules operate on public-domain, industry-standard formats and conventions. This enables one to use any of the individual modules in isolation or integrate them with any existing frameworks/tools using standard formats/conventions.

4. **Plug-n-Play** - Each module requires minimal configuration/customisation before being deployed. NOTE: User may need to add/modify the business-specific domain-specific information / templates. This is a one-time activity when beginning the any new domains.


For more details check the **`docs`** directory.

# Usage
The typical flow beginning from the **Captain America** bot/module is described <a href="https://github.com/DevonQAHackathon/avengers/blob/master/docs/ChatFlow.md" target="_blank">**here**</a>.

![QAvengers logo](docs/resources/screen1.png/?raw=true "Screenshot of MVP")

![QAvengers logo](docs/resources/screen2.png/?raw=true "Screenshot of MVP")
