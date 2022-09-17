import { GraphQLResolveInfo } from "graphql";
import { Context } from "src/context";
import { Author, Book } from "src/entities";

export interface Resolvers {
  Author: AuthorResolvers;
  Book: BookResolvers;
  Mutation: MutationResolvers;
  Query: QueryResolvers;
  SaveAuthorResult?: SaveAuthorResultResolvers;
  SaveBookResult?: SaveBookResultResolvers;
}

export type UnionResolvers = {};

export interface AuthorResolvers {
  books: Resolver<Author, {}, readonly Book[]>;
  firstName: Resolver<Author, {}, string>;
  id: Resolver<Author, {}, string>;
  lastName: Resolver<Author, {}, string | null | undefined>;
}

export interface BookResolvers {
  author: Resolver<Book, {}, Author>;
  id: Resolver<Book, {}, string>;
  title: Resolver<Book, {}, string>;
}

export interface MutationResolvers {
  saveAuthor: Resolver<{}, MutationSaveAuthorArgs, SaveAuthorResult>;
  saveBook: Resolver<{}, MutationSaveBookArgs, SaveBookResult>;
}

export interface QueryResolvers {
  testQuery: Resolver<{}, QueryTestQueryArgs, number>;
}

export interface SaveAuthorResultResolvers {
  author: Resolver<SaveAuthorResult, {}, Author>;
}

export interface SaveBookResultResolvers {
  book: Resolver<SaveBookResult, {}, Book>;
}

type MaybePromise<T> = T | Promise<T>;
export type Resolver<R, A, T> = (root: R, args: A, ctx: Context, info: GraphQLResolveInfo) => MaybePromise<T>;

export type SubscriptionResolverFilter<R, A, T> = (
  root: R | undefined,
  args: A,
  ctx: Context,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;
export type SubscriptionResolver<R, A, T> = {
  subscribe: (root: R | undefined, args: A, ctx: Context, info: GraphQLResolveInfo) => AsyncIterator<T>;
};

export interface MutationSaveAuthorArgs {
  input: SaveAuthorInput;
}
export interface MutationSaveBookArgs {
  input: SaveBookInput;
}
export interface QueryTestQueryArgs {
  error?: boolean | null | undefined;
}
export interface SaveAuthorResult {
  author: Author;
}

export interface SaveBookResult {
  book: Book;
}

export interface SaveAuthorInput {
  firstName?: string | null | undefined;
  id?: string | null | undefined;
  lastName?: string | null | undefined;
}

export interface SaveBookInput {
  authorId?: string | null | undefined;
  id?: string | null | undefined;
  title?: string | null | undefined;
}

export const possibleTypes = {} as const;
