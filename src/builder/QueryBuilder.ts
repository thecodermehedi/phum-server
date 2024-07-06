import { mongoose } from '../utils';

class QueryBuilder<T> {
  constructor(
    public modelQuery: mongoose.Query<Array<T>, T>,
    public query: Record<string, unknown>,
  ) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search(searchableFields: Array<string>) {
    const search = this?.query?.serach;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({ [field]: { regex: search, options: 'i' } }) as mongoose.FilterQuery<T>)
      })

    }
    return this;
  }
  filter() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const queryObj = (({ search, sort, limit, page, fields, ...rest }) => rest)(this.query);
    this.modelQuery = this.modelQuery.find(queryObj as mongoose.FilterQuery<T>)
    return this;
  }
  sort() {
    const { sort = '-createdAt' }: { sort?: string } = this.query;
    this.modelQuery = this.modelQuery.sort((sort).split(",").join(" "));
    return this;
  }
  paginate() {
    const { page = 1, limit = 10 }: { page?: number, limit?: number } = this.query;
    this.modelQuery = this.modelQuery.skip((page - 1) * limit).limit(limit);
    return this;
  }
  fields() {
    const { fields = '-__v' }: { fields?: string } = this.query;
    this.modelQuery = this.modelQuery.select(fields.split(",").join(" "))
    return this;
  }
}

export default QueryBuilder;
