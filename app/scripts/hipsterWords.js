var hipsterWords = {

  paragraph: '', //the paragraph from the api response

  gimmeTwo: function () {
    paragraphArray = this.paragraph.split(' ').slice(1,-1)

    paragraphArray = _.reject(paragraphArray, function(word){
      return word == ''
    })

    return _.sample(paragraphArray, 2);
  }
}

