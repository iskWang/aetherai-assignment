## Demo site:

- [https://me.josh.com.tw/aetherai-assignment/](https://me.josh.com.tw/aetherai-assignment/)

## Demo video:

[![IMAGE ALT TEXT](http://img.youtube.com/vi/ngE5eiXs5c8/0.jpg)](http://www.youtube.com/watch?v=ngE5eiXs5c8 "Demo video")

## How to Start the Application

1. Clone the repository:

   ```sh
   $ git clone git@github.com:iskWang/aetherai-assignment.git
   ```

2. Navigate to the project directory:

   ```sh
   $ cd aetherai-assignment
   ```

3. Install the dependencies (using pnpm or your preferred package manager):

   ```sh
   $ pnpm install
   ```

4. Start the development server:
   ```sh
   $ pnpm dev
   ```

## Project Structure

```bash
/src
  /Asset
  /Component
    /TodoItem
  /Container
  /Lib
  /Presentation
  /Scene
  /test
  App.tsx
  main.tsx
```

### Main Component

#### Component

Mainly for UI component

- `/Component/TodoItem`: UI component for modify and delete content in to-do list.

### Container

Connect reducer store and manage state logic.

- `/Container/Todo/TodoContainer/`: Manage to-do list store and logic.

### Presentation

The main UI page for combine components and reducer actions

- `/Presentation/Todo/TodoPresentation`: The entrie of the components and container actions.

### Scene

Combines Container, Presentation, and is intended for future use with routing requirements(eg. redirect logout)
