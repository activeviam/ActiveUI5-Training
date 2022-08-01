# ActiveUI502-Training

## Prerequisites
### Accounts and licensing
- You need an ActivePivot licence to be able to run the ActivePivot sandbox from your local computer
- You need access to Artifactory to be able to download the activeUI 5.0.2 sdk


### software versions
 - [NodeJS](https://nodejs.org/en/download/) version 14.16.0 or greater
 - [Yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable) version 1.22.4 or greater

### General Programming knowledge
- Javascript programming, including functional programming syntax
- Typescript basics are advised
- React, including the functional programming syntax and the following concepts
  - state/props
  - hooks (useState, useEffect, useMemo...)
  - Provider / Consumer
  - HOC (Higher order component)

 
### ActivePivot Sandbox
#### Download
ActiveUI 5 is compatible with all version of active pivot starting 5.8. Make sure your instance is up to date. For the Excercises in the training we use the [sandbox-release-5.9.4](https://artifacts.activeviam.com/share/ActivePivot_stable/5.9.4/jdk11/)
#### install
Go to the root of your sandbox and run
```shell
mvn clean install
```
#### start
Locate the `ActivePivotServer` class to start your project. It should be localted at `src/main/java/com/activeviam/sandbox/server/ActivePivotServer.java`

### content server initialisation
The github gist containing the files can be found [here](https://github.com/activeviam/activeui/blob/master/internal-docs/content-server-initialization.md)
If you do not have access to the gist do the following:
- run the ActivePivot instance your are planning to use (we assume the `sandbox-release-5.9.4`).
- go to your content server ([http://localhost:9090/content](http://localhost:9090/content)), and log in with a user with the role `CS_ROOT` (admin/admin will do for the sandbox). Make sure it does not contain any sensitive data as we are going to modify it.
- if a ui folder exist AND IT DOES NOT CONTAIN SENSITIVE DATA, delete it
- re create the ui folder
- once created,  right click on the `ui` folder and enter `ROLE_CS_ROOT` for both OWNERS and READERS
- right click the `ui` folde again and click import 
- Browse to the root directory of your training project and select `initial-content.json`

### Downloading  and Running Active UI
#### Setting up Access to artifactory
`npm` needs to be configured to use the internal repository for the `@activeviam` scope (the activeui packages indicated by `@activeviam` are not publicly accessible)
To do so,  run the following command:
```shell
npm login --scope @activeviam --registry https://activeviam.jfrog.io/artifactory/api/npm/npm-internal/
```
The result should be the following message:
```shell
Logged in as username to scope @activeviam on https://activeviam.jfrog.io/artifactory/api/npm/npm-internal/.
```

If the scope is not mentioned in the message, you may have to change the command to

```shell
npm login --scope=@activeviam --registry=https://activeviam.jfrog.io/artifactory/api/npm/npm-internal/
```
#### Install and Run
Now go to your project root directory and install the dependencies using
```shell
yarn install
```
Finally run your project with
```shell
yarn start
```
