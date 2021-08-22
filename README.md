# NLC2NLU Sample app


## Overview

Sample app for NLC to NLU migration


## How to generate sample CSV file

- Locate csvtool, and install dependencies:

  - `$ cd csvtool`

  - `$ npm install`

- Generate Sample training data in CSV format

  - Generate with following command:

    - `$ node csvgenerator [csvfilename]`

  - This command will retrieve news with this RSS:

    - https://news.yahoo.co.jp/rss

  - Locate generated csvfile for following commands.


## How to use NLU apps

- Locate nlu, and install dependencies:

  - `$ cd nlu`

  - `$ npm install`

- Create NLU instance, and edit `settings.js` with connection credentials

- Training

  - Prepare training contents in CSV format.

    - **Each line has to have 2 columns: text,category .**

    - **0 columns is not permitted.**

  - Train with following command:

    - `$ node training [csvfilename]`

- Check training status

  - Check training status with following command:

    - `$ node status_list`

  - Confirm your training would be `available` before proceeding.

- Analyze and classify your text

  - Confirm your training would be `available` and retrieve your custom `model_id`.

  - Analyze your text with following command:

    - `$ node analyze [text] [mode_id]`

- Delete your custom model

  - Delete your custom model with following command:

    - `$ node delete [mode_id]`


## Node.js migration

| NLC        | operation     | NLU        |
|------------|------------|------------|
| IamAuthenticator() | Authenticate | IamAuthenticator() |
|------------|------------|------------|
| createClassifier() | Create classifier/model | createClassificationModel() |
| listClassifiers() | List classifiers/models | listClassificationModels() |
| classify() | Classify/Analyze | analyze() |
| deleteClassifier() | Delete classifiers/models | deleteClassificationModel() |


## References

https://cloud.ibm.com/catalog/services/natural-language-understanding

https://cloud.ibm.com/docs/natural-language-classifier?topic=natural-language-classifier-migrating

https://cloud.ibm.com/apidocs/natural-language-understanding?code=node

https://vivinko.com/inoue/blog/2021/08/11/105847.html



## Licensing

This code is licensed under MIT.


## Copyright

2021 [K.Kimura @ Juge.Me](https://github.com/dotnsf) all rights reserved.
