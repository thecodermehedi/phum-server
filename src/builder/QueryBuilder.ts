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
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({ [field]: { $regex: search, $options: 'i' } }) as mongoose.FilterQuery<T>,
        ),
      });
    }
    return this;
  }
  filter() {
    const queryObj = { ...this.query }
    const excludes = ['search', 'sort', 'limit', 'page', 'fields']
    excludes.forEach(field => delete queryObj[field])
    this.modelQuery = this?.modelQuery?.find(queryObj as mongoose.FilterQuery<T>);
    return this;
  }
  sort() {
    const sort = this?.query?.sort as string || '-createdAt'
    this.modelQuery = this?.modelQuery?.sort(sort?.split(',')?.join(' '));
    return this;
  }
  paginate() {
    const page = this?.query?.page as number || 1;
    const limit = this?.query?.limit as number || 10;
    this.modelQuery = this.modelQuery.skip((page - 1) * limit).limit(limit);
    return this;
  }
  fields() {
    const fields = this?.query?.fields as string || '-__v';
    this.modelQuery = this.modelQuery.select(fields.split(',').join(' '));
    return this;
  }
}

export default QueryBuilder;
