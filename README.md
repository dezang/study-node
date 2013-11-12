# DEZANG'S study space about `node.js` 

## Start!
2013/11/04 

노드에서 하나의 자바스크립트 파일은 하나의 모듈이 된다. 외부에서 접근을 허용해야하는 객체는 명시적으로 지정해야 한다. 함수나 변수를 `module.exports`에 할당하면 외부에서 접근 할 수 있다.

상대경로를 사용하지 않고 모듈명(자바스크립트 파일명)을 바로 사용하면 기본모듈이나 확장모듈을 불러온다.

### module.exports를 사용하는 세 가지 방법

    exports = {};
    exports = something = {};
    module.exports = {};

노드는 콜백 함수의 첫 파라미터를 에러 객체로 사용한다. 내부에서 에러가 발생했을 때 이 에러 객체에 내용이 담겨 전달된다.

## 웹서버
간혹 노트를 웹 서버로 오해하는 경우가 많은데 웹 서버는 노드로 할 수 있는 많은 일 중 하나일 뿐이지 **노드 자체가 웹서버는 아니다.**

응답은 응답 객체인 `res`를 이용해 `res.writeHead()`함수로 응답의 헤더를 지정한다.

## 아키텍처
노드는 싱글 스레드를 사용하므로 스택도 하나만 있다. 스택을 통해 이벤트 루프를 처리한다. 실행 스택의 최하단에는 이벤트 루프를 처리하는 스택인 `ev_loop()`가 항상 존재한다.

## 노드 코딩 관례
* **들여쓰기** 공백 2칸
* **세미콜론** 세미콜론은 항상 사용 
* **작은따옴표** 문자열 등은 큰따옴표 대신 작은 따옴표를 사용
* **중괄호** 여는 중괄호는 문장과 같은 라인에 작성
* **변수와 프로퍼티** 카멜케이스 사용
* **클래스** 대문자로 시작하는 카멜케이스 사용
* **동등비교** `==` 대신 `===`을 사용한다.
* **콜백함수** 첫 파라미터는 노드 코어의 콜백 함수처럼 에러 파라미터로 사용한다.
* **콤마** 여러 줄에 걸쳐 나열할 떄는 콤마를 라인 앞에 써준다.

## 기본 모듈
* **Process**
* Utilities
* Events
* Buffers
* Streams
* Crypto
* TLS/SSL
* File System
* Path
* Net
* UDP/Datagram Sockets
* DNS
* HTTP
* HTTPS
* URL
* Query Strings
* Readline
* Vm
* Child Processes
* Assert
* TTY
* Zlib
* OS
* Cluster

## 전역객체
노드의 전역 객체는 `global`이라는 이름으로 존재한다. 전역 객체는 편의상 생략해 사용한다.

노드를 실행할 때 전달한 파라미터는 모두 `process.argv`에 배열로 저장된다.
    
    process.argv.forEach(function(val, index, array) {
      console.log(index + ':' + val);
    });

CPU 연산이 많이 필요한 작업을 비동기로 실행 할 수 있게 `process.nextTick()` 함수를 제공한다. `process.nextTick()`에 등록된 콜백 함수는 바로 실행되지 않고 이벤트 큐에 등록한다. 싱글 스레드가 현재 작업을 완료하고 다음 이벤트를 처리할 수 있을 때가 되면 `process.nextTick()`으로 등록한 콜백 함수를 차례대로 실행한다.

## 유틸리티
유틸리티 모듈은 `require('util')`로 불러온다.

## 이벤트
이벤트 모듈은 `require('events')`로 불러온다.

웹서버에 새로운 요청이 들어오거나 파일 읽기가 완료됐을 때 모두 이벤트가 발생하는데, 발생한 이벤트는 모두 `events.EventEitter`의 객체이고 `require('events').EventEmitter`로 접근한다. 노드에서 이벤트의 발생은 `emit`이라는 단어를 사용하고 이벤트가 발생했을 때 실행되는 함수를 `listener`라고 부른다. `emitter`는 이벤트가 발생하는 객체로 `EventEmitter`의 객체여야 한다.

* **emitter.addListener(event, listener) / emitter.on(event, listener)**  
객체에 이벤트를 추가한다. 일반적으로 `addListener()`보다 `on()`함수를 더 많이 사용한다.
* **emitter.once(event, listener)**  
한 번만 실행되야 하는 리스너에서 사용한다. 이것으로 등록된 리스너는 최초 한 번만 실행되고 리스너 배열에서 제거된다.
* **emitter.removeListener(event, listener)**  
지정한 이벤트에서 전달한 리스너를 제거한다.
* **emitter.removeAllListener([event])**  
이벤트에 연결된 모든 리스너를 제거한다.
* **emitter.setMaxListeners(n)**  
한 이벤트에 등록된 리스너가 10개 이상이면 메모리 누수를 찾는데 도움을 주기 위해 경고 메세지를 출력하는데, 리스너의 개수 제한을 늘리고 싶을때 사용한다. `0`을 지정하면 무한대로 등록 할 수 있다.
* **emitter.listeners(event)**  
이벤트에 등록된 리스너의 배열을 얻는다.
* **emitter.emit(event, [arg1], [arg2], ..)**  
등록된 이벤트를 발생시킨다.

## 버퍼 p85
버퍼를 생성하려면 `new Buffer()`를 사용한다. Buffer는 전역 객체이므로 `require` 없이 바로 사용할 수 있다. 문자열로 버퍼를 생성할 때는 반드시 인코딩 방법을 지정해야 한다.

버퍼의 내용을 작성하려면 아래처럼 작성한다.

    buffer.write(string, offset=0, length=buffer.length-offset, encoding='utf8')

버퍼를 문자열로 변환하려면 아래처럼 작성한다. start부터 end까지의 버퍼를 문자열로 변환한다.

    buffer.toString(encoding, start=0, end=buffer.length)

## 스트림 p87
모든 스트림은 이벤트를 사용하기 위해 `EventEmitter`의 객체다. 스트림에는 Readable Stream과 Writable Stream이 있다.

### Readable Stream
* data event
* end event
* error event
* close event  
파일 디스크립터가 닫혔을 떄 발생한다. HTTP 요청은 종료 시점을 알 수 없으므로 close를 발생시키지 않는다.
* stream.readable
* stream.setEndoding(encoding)
* stream.pause()
* stream.resume()
* stream.destory()
* stream.destorySoon()
* stream.pipe(destination, [options])

### Writable Stream
* drain event
* error event
* close event
* pipe event
* stream.writable
* stream.write(string, encoding='utf8', [fd])
* stream.end()
* stream.destory()
* stream.destroySoon()

## 파일시스템 p89
`require(fs)`로 접근한다. 대부분 함수는 동기로 동작하는 `Sync` 접미사가 붙은 함수도 같이 제공한다. 동기 함수는 노드의 성능에 큰 영향을 미치기 때문에 주의해서 사용한다.

* fs.rename(path1, path2, [callback])  
파일명을 바꾼다.
* fs.stat(path, [callback])  
파일의 정보를 확인한다.
* fs.writeFile(filename, data, encoding='utf8', [callback])  
파일의 내용을 작성한다.
* fs.watchFile(filename, [options], listener)  
파일의 변경 사항을 감시한다. options에는 persistent와 interval을 사용할 수 있다. persistent를 false로 지정하면 프로세스가 바로 종료된다. interval은 수정 여부를 확인할 간격을 밀리초 단위로 지정한다. 콜백 함수인 instener는 변경 이전의 파일과 이후 파일에 대한 fs.Stat 객체를 파라미터로 받는다.
* fs.unlink()  
파일을 삭제한다.
* fs.rmdir()  
디렉토리를 삭제한다.
* fs.realpath()  
파일의 절대 경로를 가져온다.

## 경로 p92
경로의 관련된 모듈은 `require('path')`로 불러온다.

* path.nomalize(p)
* path.join([p1], [p2], [...])
* path.resolve([from ...], to)
* path.relative(from, to)
* path.dirname(p)
* path.basename(p, [ext])
* path.extname(p)
* path.exists(p, [callback])

## 네트워크 p95
`require(net)`으로 불러온다. 비동기 네트워크 서버와 클라이언트에 관련된 함수를 제공한다.

* net.createServer([options], [connectionListener])

### net.Server
* server.listen(port, [host], [listeningListener])
* server.address()
* server.pause(msecs)
* server.close()
* server.maxConnections()
* server.connnections()

* listening event
* connection event
* close event
* error event

### net.Socket
* socket.setEncoding(encoding=null)
* socket.write(data, [encoding], [callback])
* socket.end([data], [encoding])
* socket.pause()
* socket.resume()
* socket.remoteAddress
* socket.write()
* socket.bufferSize

* connect event 
* data event
* end event
* drain event
* error event
* close event

## HTTP & HTTPS
HTTP 모듈은 `require('http')`로 사용하고 HTTPS 모듈은 `require('https')`로 사용한다. 이 둘은 사용법이 거의 같다.

### http.Server
* request event
* connection event
* close event

http.createSever([requestListener])

### http.ServerRequest
* data event
* end event

* request.method
* request.url
* request.headers
* request.httpVersion
* request.setEncodidng(encoding=null) 기본값 Buffer객체
* request.pause()
* request.resume()

### http.ServerResponse
* response.writeHead(statusCode, [reasonPhrase], [headers])
* response.write(chunk, encoding='utf8')
* response.end([data], [encoding])  
모든 응답은 반드시 end() 함수가 실행되야 한다.

## URL
url 기본 모듈은 `require('url')`로 사용한다.

* url.parse(urlStr, parseQueryString-false, slashesDenoteHost=false)
* url.format(obj)

## QueryString
쿼리문자열은 URL에서 ? 뒤에 붙는 값을 의미하며, 쿼리 문자열 모듈은 `require('querystring')`으로 사용한다.

* querystring.stringify(obj, sep='&', eq='=')
* querystring.parse(str, sep='&', eq='=')

## 자식 프로세스
자식 프로세스에 대한 기능은 `require('child_process')`로 사용한다.
* require('child_process').spawn(command, args=[], [options])  
  생성된 자식 프로세스는 `child.stdin`, `child.stdout`, `child.stderr` 세가지 스트림을 사용한다.
* child_process.exec(command, [options], callback)
* child_process.execFile()
* child.kill()

## 클러스터
클러스터 모듈은  `require('cluster')`로 사용한다.

* cluster.fork()
* cluster.isMaster
* cluster.isWorker

> 내부적으로 cluster.fork()는 chil_porcess.fork()에 기반을 두고 구현됐는데, 이 둘이 서로 다른 점은 생성한 서버가 워크 프로세스 사이에서 공유된다는 점 뿐이다.

## TCP Chat Example p111


# npm을 이용한 의존성 확장 모듈 관리
## npm?
**npm**은 아이작 슐레터가 만든 노드를 위한 패키지 매니저다. 이미 존재하는 모듈을 이용해 생산성을 높힐 수 있다.

**npm**은 모든 사용자가 접근할 수 있는 중앙저장소를 제공하고 각 노드 개발자가 자신이 만든 모듈을 패키징해 npm의 중앙저장소로 배포한다. 따라서 npm 으로 중앙저장소에서 원하는 모듈을 가져다가 쉽게 설치하고 업데이트 할 수 있다.

npm은 package.json 파일에 프로젝트 관련 정보를 담고 있다. package.json파일이 의존성 확장 모듈에 대한 정보도 담고 있으므로 package.json만 공유하면 각 개발자가 자신의 로컬 환경에서 필요한 의존 모듈을 설치할 수 있다.

> 권한에러로 설치에 실패 할 수 있는데, npm을 sudo 명령어로 설치하는 것은 옳지 못하다. 설치 시 권한 에러가 생기면 아래 명령어로 현재 계정에 /usr/local에 대한 접근 권한을 추가하여 에러를 해결한다.

    sudo chown -R $USER /usr/local

## 확장모듈 설치
확장모듈 설치는 글로벌 설치와 로컬 설치가 있다.
* 글로벌 설치 : 커맨드라인에서 명령어로 사용하는 경우로 /usr/local/lib/node_modules 안에 설치된다.
* 로컬 설치 : 소스에서 `require('module_name')`으로 접근하는 경우로 현재 위치를 기준으로 node_modules 디렉토리에 설치된다.

* npm search twitter
* npm info twitter-client

## 확장모듈 관리

* npm update 모듈명
* npm install 모듈명@버전
* npm uninstall 모듈명

## package.json

    {
      "name": "application-name"
      , "version": "0.0.1"
      , "private" : true
      , "dependencies" : {
        "express": "2.4.6"
        , "jade": ">= 0.0.1"
      }
    }

`package.json` 파일은 반드시 프로젝트 루트 위치에 있어야 한다. 

### 주요속성 p113
* name
* version
* description
* keywords
* homepage
* author
* contributors
* repository
* scripts
* config
* private
* **dependencies**
* devDependencies 
* engine


* [npm 레퍼런스 문서](https://github.com/isaacs/npm/blob/master/doc/cli/json.md)

## express



