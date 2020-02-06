import Realm from 'realm';

export const BOOKMARKS = 'bookmarks';

export const BookmarksSchema = {
  name: BOOKMARKS,
  primaryKey: 'id',
  properties: {
    id: 'string',
   // short_description: 'list',
    word_count: 'int',
    site_name: 'string',
    //tags: 'list',
    title: 'string',
    thumb_url: 'string',
    news_url: 'string',
    //author: 'list',
    desc_original: 'string',
    source_thumb_url: 'string',
    has_image: 'bool',
    num_reads: 'int',
    //keywords: 'list',
    id_original: 'string',
    category: 'string',
    //created_date: 'date',
    //desc_list: 'list',
    type: 'string',
    read_time: 'string',
    ago: 'string',
    display_date: 'string',
    site_title: 'string',
    bookmarked: 'bool',
    play_index: 'int',
    play_status: 'bool',
    view_type: 'string',
    //bookmarked: {type: 'bool', default: true},
  },
};

const databaseOptions = {
  path: 'MobileNewss.realm',
  schema: [BookmarksSchema],
};

export const createBookmark = newBookmark =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(BOOKMARKS, newBookmark, true);
          resolve(newBookmark);
          console.log('bookmark added', newBookmark);
        });
      })
      .catch(error => reject(error));
  });

export const deleteBookmark = bookmarkId =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let deletingBookmarkList = realm.objectForPrimaryKey(
            BOOKMARKS,
            bookmarkId,
          );
          realm.delete(deletingBookmarkList);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const queryAllBookmarkLists = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let allBookmarkListsObjs = realm.objects(BOOKMARKS);
        //let allBookmarkLength = allBookmarkListsObjs.length;
        resolve(allBookmarkListsObjs);
        console.log('allBookmarkLists', allBookmarkListsObjs);
      })
      .catch(error => {
        reject(error);
      });
  });

export const checkBookmarkId = id =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let bookmarkList = realm.objectForPrimaryKey(BOOKMARKS, id);
        if (bookmarkList) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(error => {
        reject(error);
      });
  });

export default new Realm(databaseOptions);
