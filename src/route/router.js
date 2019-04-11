import utils from '@/utils';
import event from '@/utils/event';

function getHistoryList() {
  try {
    let arr = JSON.parse(sessionStorage.getItem('historyList'));
    if (arr instanceof Array) return arr;
    return []
  } catch(e) {
    return [];
  }
}

const historyList = getHistoryList();
const historyIndex = historyList.indexOf(history.state);

const Router = {
  historyIndex: historyIndex,
  historyList: historyIndex == -1 ? [] : historyList,
  musureIndex(randKey, isPop) {
    if (this.historyIndex == -1) {
      this.historyList.length = 0; 
      this.historyList.push(randKey);
      this.setIndex(randKey);
      return;
    } 

    if (isPop) {
      this.historyList.splice(this.historyIndex, 1, randKey);
    } else {
      this.historyList.splice(this.historyIndex + 1)
      this.historyList.push(randKey); 
    }
    this.setIndex(randKey);
  },
  setIndex(key) {
    this.historyIndex = this.historyList.indexOf(key);
  },
  goto(url) {
    let randKey = utils.randKey();
    this.musureIndex(randKey);
    history.pushState(randKey, null, url);
    event.emit('URL_CHANGE', 'URL_GOTO');
  },
  gotoReplace(url) {
    let randKey = utils.randKey();
    this.musureIndex(randKey, true);
    history.replaceState(randKey, null, url);
    event.emit('URL_CHANGE', 'URL_REPLACE');
  }
};

window.addEventListener('beforeunload', (e) => {
  sessionStorage.setItem('historyList', JSON.stringify(Router.historyList));
});

window.addEventListener('popstate', (e) => {
  let prevIndex = Router.historyIndex;
  Router.setIndex(history.state);
  if (prevIndex > Router.historyIndex) {
    event.emit('URL_CHANGE', 'URL_BACK');
  } else {
    event.emit('URL_CHANGE', 'URL_FORWARD');
  }
});

const goto = Router.goto.bind(Router);
const gotoReplace = Router.gotoReplace.bind(Router);
export {
  goto,
  gotoReplace
}