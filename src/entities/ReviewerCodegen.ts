import {
  BaseEntity,
  Changes,
  Collection,
  ConfigApi,
  EntityFilter,
  EntityGraphQLFilter,
  EntityOrmField,
  fail,
  FilterOf,
  Flavor,
  hasMany,
  isLoaded,
  Lens,
  Loaded,
  LoadHint,
  loadLens,
  newChangesProxy,
  newRequiredRule,
  OptsOf,
  OrderBy,
  PartialOrNull,
  setField,
  setOpts,
  ValueFilter,
  ValueGraphQLFilter,
} from "joist-orm";
import { BookReview, BookReviewId, bookReviewMeta, newReviewer, Reviewer, reviewerMeta } from "./entities";
import type { EntityManager } from "./entities";

export type ReviewerId = Flavor<string, "Reviewer">;

export interface ReviewerFields {
  id: { kind: "primitive"; type: number; unique: true; nullable: false };
  name: { kind: "primitive"; type: string; unique: false; nullable: never };
  age: { kind: "primitive"; type: number; unique: false; nullable: never };
  createdAt: { kind: "primitive"; type: Date; unique: false; nullable: never };
  updatedAt: { kind: "primitive"; type: Date; unique: false; nullable: never };
}

export interface ReviewerOpts {
  name: string;
  age: number;
  bookReviews?: BookReview[];
}

export interface ReviewerIdsOpts {
  bookReviewIds?: BookReviewId[] | null;
}

export interface ReviewerFilter {
  id?: ValueFilter<ReviewerId, never>;
  name?: ValueFilter<string, never>;
  age?: ValueFilter<number, never>;
  createdAt?: ValueFilter<Date, never>;
  updatedAt?: ValueFilter<Date, never>;
  bookReviews?: EntityFilter<BookReview, BookReviewId, FilterOf<BookReview>, null | undefined>;
}

export interface ReviewerGraphQLFilter {
  id?: ValueGraphQLFilter<ReviewerId>;
  name?: ValueGraphQLFilter<string>;
  age?: ValueGraphQLFilter<number>;
  createdAt?: ValueGraphQLFilter<Date>;
  updatedAt?: ValueGraphQLFilter<Date>;
  bookReviews?: EntityGraphQLFilter<BookReview, BookReviewId, FilterOf<BookReview>, null | undefined>;
}

export interface ReviewerOrder {
  id?: OrderBy;
  name?: OrderBy;
  age?: OrderBy;
  createdAt?: OrderBy;
  updatedAt?: OrderBy;
}

export const reviewerConfig = new ConfigApi<Reviewer, {}>();

reviewerConfig.addRule(newRequiredRule("name"));
reviewerConfig.addRule(newRequiredRule("age"));
reviewerConfig.addRule(newRequiredRule("createdAt"));
reviewerConfig.addRule(newRequiredRule("updatedAt"));

export abstract class ReviewerCodegen extends BaseEntity<EntityManager> {
  static defaultValues: object = {};

  declare readonly __orm: EntityOrmField & {
    filterType: ReviewerFilter;
    gqlFilterType: ReviewerGraphQLFilter;
    orderType: ReviewerOrder;
    optsType: ReviewerOpts;
    fieldsType: ReviewerFields;
    optIdsType: ReviewerIdsOpts;
    factoryOptsType: Parameters<typeof newReviewer>[1];
  };

  readonly bookReviews: Collection<Reviewer, BookReview> = hasMany(
    bookReviewMeta,
    "bookReviews",
    "reviewer",
    "reviewer_id",
    undefined,
  );

  constructor(em: EntityManager, opts: ReviewerOpts) {
    super(em, reviewerMeta, ReviewerCodegen.defaultValues, opts);
    setOpts(this as any as Reviewer, opts, { calledFromConstructor: true });
  }

  get id(): ReviewerId | undefined {
    return this.idTagged;
  }

  get idOrFail(): ReviewerId {
    return this.id || fail("Reviewer has no id yet");
  }

  get idTagged(): ReviewerId | undefined {
    return this.__orm.data["id"];
  }

  get idTaggedOrFail(): ReviewerId {
    return this.idTagged || fail("Reviewer has no id tagged yet");
  }

  get name(): string {
    return this.__orm.data["name"];
  }

  set name(name: string) {
    setField(this, "name", name);
  }

  get age(): number {
    return this.__orm.data["age"];
  }

  set age(age: number) {
    setField(this, "age", age);
  }

  get createdAt(): Date {
    return this.__orm.data["createdAt"];
  }

  get updatedAt(): Date {
    return this.__orm.data["updatedAt"];
  }

  set(opts: Partial<ReviewerOpts>): void {
    setOpts(this as any as Reviewer, opts);
  }

  setPartial(opts: PartialOrNull<ReviewerOpts>): void {
    setOpts(this as any as Reviewer, opts as OptsOf<Reviewer>, { partial: true });
  }

  get changes(): Changes<Reviewer> {
    return newChangesProxy(this) as any;
  }

  load<U, V>(fn: (lens: Lens<Reviewer>) => Lens<U, V>, opts: { sql?: boolean } = {}): Promise<V> {
    return loadLens(this as any as Reviewer, fn, opts);
  }

  populate<H extends LoadHint<Reviewer>>(hint: H): Promise<Loaded<Reviewer, H>>;
  populate<H extends LoadHint<Reviewer>>(opts: { hint: H; forceReload?: boolean }): Promise<Loaded<Reviewer, H>>;
  populate<H extends LoadHint<Reviewer>, V>(hint: H, fn: (r: Loaded<Reviewer, H>) => V): Promise<V>;
  populate<H extends LoadHint<Reviewer>, V>(
    opts: { hint: H; forceReload?: boolean },
    fn: (r: Loaded<Reviewer, H>) => V,
  ): Promise<V>;
  populate<H extends LoadHint<Reviewer>, V>(
    hintOrOpts: any,
    fn?: (r: Loaded<Reviewer, H>) => V,
  ): Promise<Loaded<Reviewer, H> | V> {
    return this.em.populate(this as any as Reviewer, hintOrOpts, fn);
  }

  isLoaded<H extends LoadHint<Reviewer>>(hint: H): this is Loaded<Reviewer, H> {
    return isLoaded(this as any as Reviewer, hint);
  }
}
