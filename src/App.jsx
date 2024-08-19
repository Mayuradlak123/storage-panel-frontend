import { useEffect, useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { GEN_AI_KEY } from './config'
import './index.css'
const genAI = new GoogleGenerativeAI(GEN_AI_KEY);

function App() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");
  // const [answer, setAnswer] = useState("");
  // const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro", // Replace with an actual valid model name
      });

      const response = await model.generateContent(question);
      setAnswer(response.response.text);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to fetch the answer.");
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   const getModel = async () => {
  //     try {
  //       // const model = await genAI.listModels(); // Adjust to the correct method
  //       // console.log("Available models:", model);

  //       const generativeModel = genAI.getGenerativeModel({
  //         model: "gemini-1.5-pro" // Update with a valid model name
  //       });

  //       const response = await generativeModel.generateContent("The Capital of India");
  //       setAnswer(response.response.text);
  //     } catch (err) {
  //       console.error("Error:", err);
  //       setError("Failed to fetch the model or generate content.");
  //     }
  //   };

  //   getModel();
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Generative AI Integration</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-blue-500 text-white rounded-lg focus:outline-none transition duration-300 ease-in-out ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>

        <div className="mt-6">
          {error && <p className="text-red-500">{error}</p>}
          {answer && !loading && (
            <div className="mt-4 p-4 bg-gray-50 border rounded-lg shadow-md transition-transform transform-gpu animate-fadeIn">
              <h3 className="text-xl font-semibold">Answer:</h3>
              <p>{answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App
