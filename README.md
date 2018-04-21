## Tech

Wykorzystane technologie

* React
* Java - 1.8
* maven
* TypeScript
* [Ant](https://ant.design/)
* [Travis](https://travis-ci.org/)
* [NodeJS](https://nodejs.org/) - 8.10.0
* [Yarn](https://yarnpkg.com/en/docs/install)
* [nodist](https://github.com/marcelklehr/nodist/releases)

## Installation

Instalację zaczynamy od środowiska, instalujemy wsz po kolei:
* [IntelliJ IDEA](https://www.jetbrains.com/idea/) oraz jave odpowiedniej wersji `(wersja w Tech)`;
* Yarn `(link w Tech)` lub npm;
* Nodist `(link w Tech)`;

## Development

Otwieramy swój ulubliony terminal, polecam [cmder](http://cmder.net/).

### IntelliJ
Mam nadzeje że z IntelliJ wszystko jasne.

### Nodist

Jest on potrzebny dla uruchomienia front-end'owej części apliakcji, oraz pozwala latwo podmieniac werjse noda.

Uruchomiamy terminal i wykonujemy:

```sh
$ nodist global 8.10.0
```

### To start the project

* Uruchomiamy projekt Jawowy, domyslnie jest ona na porcie `http://localhost:8080`.

* Uruchomiamy stronę:

Wykonanie samego polecenie `yarn` jest potrzebne tylko dla zainstalowania bibliotek, nie jest ono potrzebne jesli uruchomiamy raz za razem, tylko po zainstalowaniu nowej biblioteki do apki przez innego czlonku zespolu.

Natomiast `yarn start` juz uruchamia aplikację.

```sh
$ cd chatbotMASI\client
$ yarn
$ yarn start
```

Domyslnie jest na porcie `http://localhost:3006`
