import CalendarApp from "./components"
import { CalendarProvider } from "./state/CalendarContext"

function App() {

  return (
    <CalendarProvider>
      <CalendarApp />
    </CalendarProvider>
  )
}

export default App
