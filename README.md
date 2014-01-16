AwesomePrelims
==============

Preliminary work for the Awesome library (not DisMaL).  

No more individual dirs... just js and java

# Useful JavaScript References (for non-beginners that want to become advanced practitioners)

Best:

* JavaScript Enlightenment, By: Cody Lindley, Publisher: O'Reilly Media, Inc., Pub. Date: January 7, 2013, Print ISBN-13: 978-1-4493-4288-3 
** http://proquest.safaribooksonline.com/book/programming/javascript/9781449344412
** Off campus: http://proquest.safaribooksonline.com.proxy.library.ucsb.edu:2048/book/programming/javascript/9781449344412


Perhaps Also helpful:

* Maintainable JavaScript, By: Nicholas C. Zakas, O'Reilly Media, Inc., 2012, ISBN-13: 978-1-4493-2768-2
** http://proquest.safaribooksonline.com/book/programming/javascript/9781449328092
* JavaScript Web Applications, By: Alex MacCaw, O'Reilly Media, Inc, 2011, ISBN-13: 978-1-4493-0351-8
** http://proquest.safaribooksonline.com/book/programming/javascript/9781449308216

(From off campus, just stick .proxy.library.ucsb.edu:2048 after the safaribooksonline.com part of the URL.)

# Getting Started 

This section is for new contributors to the AwesomePrelims repo.  It assumes some basic familiarity with git and github concepts.    


## The two branches

The master branch is, as usual, the... um... master branch.    So, what is that other branch, gh-pages?

That's the branch that actually gets published to the web at pconrad.github.io/AwesomePrelims

So, the usual workflow is:  

* do the "real" work in the master branch.  
* Let's suppose that you did a git clone, and now, a clone of this repo is in /home/jsmith/github/AwesomePrellims on your local hard drive.  Check your work by visiting the URL file:///home/jsmith/github/AwesomePrelims/index.html   
* You may commit and push often to the master branch.  But, then, when and only when you have something stable that you want to share with the world, as the official new "release" of AwesomePrelims, you do:

NOTE: WHAT I WROTE BELOW MAY BE TOTAL NONSENSE... I'M GOING TO TRY IT OUT...

```
git checkout gh-pages   # switch to gh-pages branch
git merge origin master   # go get that stuff from master and stick it in the current gh-pages branch
git push origin gh-pages
git checkout master
```
