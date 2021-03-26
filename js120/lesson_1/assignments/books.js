function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,
    getDescription() {
      return `${this.title} was written by ${this.author}. I have${this.read ? "" : "n't"} read it.`;
    },
    readbook() {
      this.read = true;
    }
  };
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse');
book1.read = true;
console.log(
  book1.getDescription(),  // "Mythos was written by Stephen Fry."
  book2.getDescription(),  // "Me Talk Pretty One Day was written by David Sedaris."
  book3.getDescription(),  // "Aunts aren't Gentlemen was written by PG Wodehouse"
)