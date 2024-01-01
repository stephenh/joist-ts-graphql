import {
  BaseEntity,
  Changes,
  ConfigApi,
  EntityFilter,
  EntityGraphQLFilter,
  EntityMetadata,
  EntityOrmField,
  failNoIdYet,
  FilterOf,
  Flavor,
  getField,
  getOrmField,
  GraphQLFilterOf,
  hasOne,
  isLoaded,
  Lens,
  Loaded,
  LoadHint,
  loadLens,
  ManyToOneReference,
  newChangesProxy,
  newRequiredRule,
  OptsOf,
  OrderBy,
  PartialOrNull,
  setField,
  setOpts,
  TaggedId,
  toIdOf,
  ValueFilter,
  ValueGraphQLFilter,
} from "joist-orm";
import {
  Book,
  BookId,
  bookMeta,
  BookOrder,
  BookReview,
  bookReviewMeta,
  Entity,
  EntityManager,
  newBookReview,
} from "./entities";

export type BookReviewId = Flavor<string, BookReview>;

export interface BookReviewFields {
  id: { kind: "primitive"; type: number; unique: true; nullable: never };
  rating: { kind: "primitive"; type: number; unique: false; nullable: never; derived: false };
  createdAt: { kind: "primitive"; type: Date; unique: false; nullable: never; derived: true };
  updatedAt: { kind: "primitive"; type: Date; unique: false; nullable: never; derived: true };
  book: { kind: "m2o"; type: Book; nullable: never; derived: false };
}

export interface BookReviewOpts {
  rating: number;
  book: Book | BookId;
}

export interface BookReviewIdsOpts {
  bookId?: BookId | null;
}

export interface BookReviewFilter {
  id?: ValueFilter<BookReviewId, never> | null;
  rating?: ValueFilter<number, never>;
  createdAt?: ValueFilter<Date, never>;
  updatedAt?: ValueFilter<Date, never>;
  book?: EntityFilter<Book, BookId, FilterOf<Book>, never>;
}

export interface BookReviewGraphQLFilter {
  id?: ValueGraphQLFilter<BookReviewId>;
  rating?: ValueGraphQLFilter<number>;
  createdAt?: ValueGraphQLFilter<Date>;
  updatedAt?: ValueGraphQLFilter<Date>;
  book?: EntityGraphQLFilter<Book, BookId, GraphQLFilterOf<Book>, never>;
}

export interface BookReviewOrder {
  id?: OrderBy;
  rating?: OrderBy;
  createdAt?: OrderBy;
  updatedAt?: OrderBy;
  book?: BookOrder;
}

export const bookReviewConfig = new ConfigApi<BookReview, {}>();

bookReviewConfig.addRule(newRequiredRule("rating"));
bookReviewConfig.addRule(newRequiredRule("createdAt"));
bookReviewConfig.addRule(newRequiredRule("updatedAt"));
bookReviewConfig.addRule(newRequiredRule("book"));

export abstract class BookReviewCodegen extends BaseEntity<EntityManager, string> implements Entity {
  static defaultValues: object = {};
  static readonly tagName = "br";
  static readonly metadata: EntityMetadata<BookReview>;

  declare readonly __orm: EntityOrmField & {
    filterType: BookReviewFilter;
    gqlFilterType: BookReviewGraphQLFilter;
    orderType: BookReviewOrder;
    optsType: BookReviewOpts;
    fieldsType: BookReviewFields;
    optIdsType: BookReviewIdsOpts;
    factoryOptsType: Parameters<typeof newBookReview>[1];
  };

  constructor(em: EntityManager, opts: BookReviewOpts) {
    super(em, bookReviewMeta, BookReviewCodegen.defaultValues, opts);
    setOpts(this as any as BookReview, opts, { calledFromConstructor: true });
  }

  get id(): BookReviewId {
    return this.idMaybe || failNoIdYet("BookReview");
  }

  get idMaybe(): BookReviewId | undefined {
    return toIdOf(bookReviewMeta, this.idTaggedMaybe);
  }

  get idTagged(): TaggedId {
    return this.idTaggedMaybe || failNoIdYet("BookReview");
  }

  get idTaggedMaybe(): TaggedId | undefined {
    return getField(this, "id");
  }

  get rating(): number {
    return getField(this, "rating");
  }

  set rating(rating: number) {
    setField(this, "rating", rating);
  }

  get createdAt(): Date {
    return getField(this, "createdAt");
  }

  get updatedAt(): Date {
    return getField(this, "updatedAt");
  }

  set(opts: Partial<BookReviewOpts>): void {
    setOpts(this as any as BookReview, opts);
  }

  setPartial(opts: PartialOrNull<BookReviewOpts>): void {
    setOpts(this as any as BookReview, opts as OptsOf<BookReview>, { partial: true });
  }

  get changes(): Changes<BookReview> {
    return newChangesProxy(this) as any;
  }

  load<U, V>(fn: (lens: Lens<BookReview>) => Lens<U, V>, opts: { sql?: boolean } = {}): Promise<V> {
    return loadLens(this as any as BookReview, fn, opts);
  }

  populate<H extends LoadHint<BookReview>>(hint: H): Promise<Loaded<BookReview, H>>;
  populate<H extends LoadHint<BookReview>>(opts: { hint: H; forceReload?: boolean }): Promise<Loaded<BookReview, H>>;
  populate<H extends LoadHint<BookReview>, V>(hint: H, fn: (br: Loaded<BookReview, H>) => V): Promise<V>;
  populate<H extends LoadHint<BookReview>, V>(
    opts: { hint: H; forceReload?: boolean },
    fn: (br: Loaded<BookReview, H>) => V,
  ): Promise<V>;
  populate<H extends LoadHint<BookReview>, V>(
    hintOrOpts: any,
    fn?: (br: Loaded<BookReview, H>) => V,
  ): Promise<Loaded<BookReview, H> | V> {
    return this.em.populate(this as any as BookReview, hintOrOpts, fn);
  }

  isLoaded<H extends LoadHint<BookReview>>(hint: H): this is Loaded<BookReview, H> {
    return isLoaded(this as any as BookReview, hint);
  }

  get book(): ManyToOneReference<BookReview, Book, never> {
    const { relations } = getOrmField(this);
    return relations.book ??= hasOne(this as any as BookReview, bookMeta, "book", "reviews");
  }
}
