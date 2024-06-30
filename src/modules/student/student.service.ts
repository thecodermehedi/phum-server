import { StudentModel } from './student.model';

const getStudentsFromDB = () => StudentModel.find();

const getStudentFromDB = (id: string) => StudentModel.findById(id);

export const StudentServices = {
  getStudentsFromDB,
  getStudentFromDB,
};

/*
These mongoose method is asyncronus by nature
find(): Used to retrieve documents from a collection.
findOne(): Finds a single document in the collection.
findById(): Finds a single document by its _id field.
save(): Saves a document instance to the database.
updateOne(): Updates a single document in the collection.
deleteOne(): Deletes a single document in the collection.
aggregate(): Performs aggregation operations on the collection data.
countDocuments(): Counts the number of documents that match a query.
*/
