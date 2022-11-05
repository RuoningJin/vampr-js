class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    if (this.creator) {
      count++;
      count += this.creator.numberOfVampiresFromOriginal;
    }
    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  get findRoot() {
    if (this.creator !== null) {
      this.creator.findRoot;
    }
    return this;
  }

  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }
    for (const offspring of this.offspring) {
      let result = offspring.vampireWithName(name);
      if (result) {
        return result;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let counter = 0;

    for (const offspring of this.offspring) {
      counter++;
      counter += offspring.totalDescendents;
    }
    return counter;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {

    let array = [];

    if (this.yearConverted > 1980) {
      array.push(this);
    }

    for (const offspring of this.offspring) {
      array = array.concat(offspring.allMillennialVampires);
    }
    return array;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.

  allAncestors() {
    let creators = [];
    creators.push(this);
    if (this.creator) {
      creators = creators.concat(this.creator.allAncestors());
    }
    return creators;
  }

  closestCommonAncestor(vampire) {

    const thisCreators = this.allAncestors();
    const vampireCreators = vampire.allAncestors();

    for (const creator of thisCreators) {
      for (const vCreator of vampireCreators) {
        if (creator === vCreator) {
          return creator;
        }
      }
    }
  }
  

}

module.exports = Vampire;

