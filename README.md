# social-network-api

## About this project

This project was done as part of the assignments in the UC Berkeley full stuck web developer coding bootcamp. In this assignment, the students are tasked to build an API that meets the following requirements from scratch:

```md
- Command line propompt to start the local server with the Mongoose models and the MongoDB database
- You can create, update, and delete users and thoughts in the database
- You can create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Use

- This is application is not deployed for the public use
- Demo video: https://drive.google.com/file/d/1-iuL50aiR8PxN70qf44V2gWeOjq5Efmr/view
- Screenshot: ![screenshot](https://github.com/mitsukaichi/tech-blog/assets/45612744/4a9901b2-7f07-46bc-931b-0eaf72ba4fa7)

## Resources referenced while building this
- [How to delete a specific nested subdocument completely from an document : MongoDB
Developer Community](https://www.mongodb.com/community/forums/t/how-to-delete-a-specific-nested-subdocument-completely-from-an-document/100219)
- [Mongo: How do I insert another subdocument to an existing document : stackoverflow](https://stackoverflow.com/questions/19372093/mongo-how-do-i-insert-another-subdocument-to-an-existing-document)
- [ObjectId.toString() : MongoDB Manual](https://www.mongodb.com/docs/manual/reference/method/ObjectId.toString/#:~:text=toString(),)
- [Query an Array of Embedded Documents : MongoDB Manual](https://www.mongodb.com/docs/v7.0/tutorial/query-array-of-documents/)
- [Difference between res.json vs res.send vs res.end in Express.js](https://medium.com/gist-for-js/use-of-res-json-vs-res-send-vs-res-end-in-express-b50688c0cddf)


### Things I learnt from this challenge

- Overview of the MongoDB CRUD operations - how this is different from MySQL / Sqeualize
- Overview of the model creation with mongoose - some additional features only available through mongoose
- It's sometimes confusing to understand which functionalities are coming from either MongoDB or mongoose. You may need to double check which documentation you need to refer to debug some errors
- I kept getting the error of "module not found" error as I needed to specify the filepath as '../../models' from the file in routes > api. I need a better understanding of how exactly those filepath specifications work.
- Difference between res.json vs res.send vs res.end in Express.js (from the referenced article listed above)

### License

MIT License

Copyright (c) [2023] [Minami Mukai]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
