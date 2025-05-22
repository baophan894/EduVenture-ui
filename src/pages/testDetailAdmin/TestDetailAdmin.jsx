"use client";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FaArrowLeft,
  FaBook,
  FaCamera,
  FaComment,
  FaEdit,
  FaExclamationCircle,
  FaEye,
  FaFileAlt,
  FaListUl,
  FaMicrophone,
  FaPencilAlt,
  FaPlay,
  FaRegCalendarAlt,
  FaRegCheckSquare,
  FaRegClock,
  FaRegSquare,
  FaSave,
  FaStar,
  FaTimes,
  FaTrash,
  FaUser,
  FaUsers,
  FaUndo,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import TestDetails from "./components/TestDetails";
import TestInstructor from "./components/TestInstructor";
import TestParts from "./components/TestParts";
import TestQuestions from "./components/TestQuestions";
import DeleteModal from "./components/DeleteModal";
import CancelModal from "./components/CancelModal";
import SaveModal from "./components/SaveModal";
import CoverImage from "./components/CoverImage";
import TestReviews from "./components/TestReviews";

const TestDetailAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [originalTest, setOriginalTest] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("cover");
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [selectedCorrectAnswers, setSelectedCorrectAnswers] = useState({});
  const [questionTypes, setQuestionTypes] = useState([]);
  const [testTypes, setTestTypes] = useState([]);
  const [testLevels, setTestLevels] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [expandedParts, setExpandedParts] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [imageFiles, setImageFiles] = useState({
    coverImg: null,
    instructorAvatar: null,
    questions: {},
  });

  // Available icons for parts
  const availableIcons = [
    { name: "FaCamera", component: FaCamera },
    { name: "FaComment", component: FaComment },
    { name: "FaUsers", component: FaUsers },
    { name: "FaMicrophone", component: FaMicrophone },
    { name: "FaPencilAlt", component: FaPencilAlt },
    { name: "FaFileAlt", component: FaFileAlt },
    { name: "FaBook", component: FaBook },
    { name: "FaListUl", component: FaListUl },
    { name: "FaPlay", component: FaPlay },
    { name: "FaRegClock", component: FaRegClock },
    { name: "FaRegCalendarAlt", component: FaRegCalendarAlt },
    { name: "FaRegCheckSquare", component: FaRegCheckSquare },
    { name: "FaRegSquare", component: FaRegSquare },
    { name: "FaStar", component: FaStar },
    { name: "FaUser", component: FaUser },
  ];

  // Toggle question expansion
  const toggleQuestion = (questionId) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Toggle part expansion
  const togglePart = (partId) => {
    setExpandedParts((prev) => ({
      ...prev,
      [partId]: !prev[partId],
    }));
  };

  // Initialize selected correct answers from the test data
  useEffect(() => {
    if (test) {
      const initialSelections = {};
      test.testParts.forEach((part) => {
        part.questions.forEach((question) => {
          if (question.correctAnswer) {
            if (question.typeName === "Multiple Choice") {
              initialSelections[question.id] =
                question.correctAnswer.split(",");
            } else {
              initialSelections[question.id] = question.correctAnswer;
            }
          }
        });
      });
      setSelectedCorrectAnswers(initialSelections);
    }
  }, [test]);

  // Fetch test data
  const fetchTest = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/api/tests/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch test data");
      }
      const data = await response.json();
      setTest(data);
      setOriginalTest(JSON.parse(JSON.stringify(data)));
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load test data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTest();
  }, [id]);

  // Fetch question types, test types, levels and languages
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          questionTypesResponse,
          testTypesResponse,
          levelsResponse,
          languagesResponse,
        ] = await Promise.all([
          fetch("http://localhost:8080/api/question-types"),
          fetch("http://localhost:8080/api/test-types"),
          fetch("http://localhost:8080/api/test-levels"),
          fetch("http://localhost:8080/api/languages"),
        ]);

        const questionTypesData = await questionTypesResponse.json();
        const testTypesData = await testTypesResponse.json();
        const levelsData = await levelsResponse.json();
        const languagesData = await languagesResponse.json();

        setQuestionTypes(questionTypesData);
        setTestTypes(testTypesData);
        setTestLevels(levelsData);
        setLanguages(languagesData);
      } catch (error) {
        toast.error("Failed to fetch data");
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Sort data alphabetically
  const sortedQuestionTypes = [...questionTypes].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const sortedTestTypes = [...testTypes].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const sortedTestLevels = [...testLevels].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const sortedLanguages = [...languages].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Filter test levels based on selected language
  const filteredTestLevels = test?.languageId
    ? sortedTestLevels.filter((level) => level.language.id === test.languageId)
    : sortedTestLevels;

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate total duration from parts
  const calculateTotalDuration = (parts) => {
    return parts.reduce((total, part) => {
      // Skip deleted parts
      if (part.isDeleted) return total;
      // Add part duration if it exists, otherwise add 0
      return total + (part.duration || 0);
    }, 0);
  };

  // Handle part changes
  const handlePartChange = (partIndex, field, value) => {
    setTest((prev) => {
      let updatedParts;
      // If partIndex is -1 and field is "testParts", update the entire parts array
      if (partIndex === -1 && field === "testParts") {
        updatedParts = value;
      } else {
        // Find the part by its order value
        const partOrder = partIndex + 1; // Convert index to order
        updatedParts = prev.testParts.map((part) =>
          part.order === partOrder ? { ...part, [field]: value } : part
        );
      }

      // Calculate new total duration
      const newDuration = calculateTotalDuration(updatedParts);

      return {
        ...prev,
        testParts: updatedParts,
        duration: newDuration,
      };
    });
  };

  // Handle question changes
  const handleQuestionChange = (partIndex, questionIndex, field, value) => {
    setTest((prev) => {
      // If questionIndex is -1 and field is "questions", update the entire questions array
      if (questionIndex === -1 && field === "questions") {
        const partOrder = partIndex + 1;
        return {
          ...prev,
          testParts: prev.testParts.map((part) =>
            part.order === partOrder ? { ...part, questions: value } : part
          ),
        };
      }
      // Otherwise update a single question's field using order
      const partOrder = partIndex + 1;
      const questionOrder = questionIndex + 1;
      return {
        ...prev,
        testParts: prev.testParts.map((part) =>
          part.order === partOrder
            ? {
                ...part,
                questions: part.questions.map((question) =>
                  question.order === questionOrder
                    ? { ...question, [field]: value }
                    : question
                ),
              }
            : part
        ),
      };
    });
  };

  // Handle option changes
  const handleOptionChange = (
    partIndex,
    questionIndex,
    optionIndex,
    field,
    value
  ) => {
    setTest((prev) => ({
      ...prev,
      testParts: prev.testParts.map((part) =>
        part.order === partIndex + 1
          ? {
              ...part,
              questions: part.questions.map((question) =>
                question.order === questionIndex + 1
                  ? {
                      ...question,
                      questionOptions: question.questionOptions.map(
                        (option, k) =>
                          k === optionIndex
                            ? { ...option, [field]: value }
                            : option
                      ),
                    }
                  : question
              ),
            }
          : part
      ),
    }));
  };

  // Handle array field changes (features, requirements)
  const handleArrayChange = (field, index, value) => {
    setTest((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  // Add item to array field
  const handleAddArrayItem = (field, value = "") => {
    setTest((prev) => ({
      ...prev,
      [field]: [...prev[field], value],
    }));
  };

  // Remove item from array field
  const handleRemoveArrayItem = (field, index) => {
    setTest((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Handle single choice answer selection
  const handleSingleChoiceSelection = (questionId, optionId) => {
    if (!isEditing) return;

    setSelectedCorrectAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));

    // Update the test data
    test.testParts.forEach((part) => {
      part.questions.forEach((question) => {
        if (question.id === questionId) {
          handleQuestionChange(
            part.order - 1,
            question.order - 1,
            "correctAnswer",
            optionId
          );
        }
      });
    });
  };

  // Handle multiple choice answer selection
  const handleMultipleChoiceSelection = (questionId, optionId) => {
    if (!isEditing) return;

    setSelectedCorrectAnswers((prev) => {
      const currentSelections = prev[questionId] || [];
      let newSelections;

      if (currentSelections.includes(optionId)) {
        newSelections = currentSelections.filter((id) => id !== optionId);
      } else {
        newSelections = [...currentSelections, optionId].sort();
      }

      // Update the test data
      test.testParts.forEach((part) => {
        part.questions.forEach((question) => {
          if (question.id === questionId) {
            handleQuestionChange(
              part.order - 1,
              question.order - 1,
              "correctAnswer",
              newSelections.join(",")
            );
          }
        });
      });

      return {
        ...prev,
        [questionId]: newSelections,
      };
    });
  };

  // Handle fill in blank answer change
  const handleFillInBlankChange = (partIndex, questionIndex, value) => {
    handleQuestionChange(partIndex, questionIndex, "correctAnswer", value);

    const questionId = test.testParts[partIndex].questions[questionIndex].id;
    setSelectedCorrectAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Add ESC key handler
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setShowDeleteModal(false);
        setShowCancelModal(false);
        setShowSaveModal(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  // Update save handler to check for changes first
  const handleSave = () => {
    // Check if there are any changes
    const hasChanges = JSON.stringify(test) !== JSON.stringify(originalTest);

    if (!hasChanges) {
      setIsEditing(false);
      toast.success("No changes to save", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#10B981",
          color: "#fff",
        },
      });
      return;
    }

    // Only show modal if there are changes
    setShowSaveModal(true);
  };

  // Add confirm save handler
  const handleConfirmSave = async () => {
    setSaving(true);
    try {
      // Create FormData object
      const formData = new FormData();

      // Filter out deleted features, requirements, parts, and questions
      // And reorder parts and questions
      const testToSave = {
        ...test,
        testFeatures: test.testFeatures.filter(
          (feature) => !feature.startsWith("__DELETED__")
        ),
        testRequirements: test.testRequirements.filter(
          (requirement) => !requirement.startsWith("__DELETED__")
        ),
        testParts: test.testParts
          .filter((part) => !part.isDeleted)
          .map((part, index) => ({
            ...part,
            order: index, // Start from 0
            questions: part.questions
              .filter((question) => !question.isDeleted)
              .map((question, qIndex) => ({
                ...question,
                order: qIndex, // Start from 0
              })),
          })),
      };

      // Add test data as JSON string since backend expects JSON
      formData.append(
        "test",
        new Blob([JSON.stringify(testToSave)], { type: "application/json" })
      );

      // Handle cover image upload if we have a file
      if (imageFiles.coverImg) {
        formData.append("coverImg", imageFiles.coverImg);
      }

      // Handle instructor avatar upload if we have a file
      if (imageFiles.instructorAvatar) {
        formData.append("instructorAvatar", imageFiles.instructorAvatar);
      }

      // Handle question images
      for (
        let partIndex = 0;
        partIndex < testToSave.testParts.length;
        partIndex++
      ) {
        const part = testToSave.testParts[partIndex];
        // Handle part audio file
        const partKey = `part_${part.order}_audio`;
        if (imageFiles[partKey]) {
          formData.append(`part_${part.order}_audio`, imageFiles[partKey]);
        }

        // Handle question images
        for (
          let questionIndex = 0;
          questionIndex < part.questions.length;
          questionIndex++
        ) {
          const question = part.questions[questionIndex];
          const questionImageKey = `question_${part.order}_${question.order}`;
          if (imageFiles[questionImageKey]) {
            formData.append(
              `part_${part.order}_question_${question.order}_image`,
              imageFiles[questionImageKey]
            );
          }
        }
      }

      const response = await fetch(`http://localhost:8080/api/tests/${id}`, {
        method: "PUT",
        headers: {
          // Don't set Content-Type header - let the browser set it with the boundary
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update test");
      }

      // Get the updated test data from the response
      const savedTest = await response.json();

      // Update both test and originalTest with the response data
      setOriginalTest(savedTest);
      setTest(savedTest);
      // Clear image files after successful save
      setImageFiles((prev) => ({
        coverImg: null,
        instructorAvatar: null,
        questions: {},
        // Preserve audio files
        ...Object.fromEntries(
          Object.entries(prev).filter(([key]) => key.startsWith("part_"))
        ),
      }));
      setIsEditing(false);
      setShowSaveModal(false);
      toast.success("Test updated successfully!", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#10B981",
          color: "#fff",
        },
      });
    } catch (err) {
      toast.error(err.message || "Failed to update test. Please try again.", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#EF4444",
          color: "#fff",
        },
      });
    } finally {
      setSaving(false);
    }
  };

  // Get icon component based on icon name
  const getIconComponent = (iconName) => {
    const icon = availableIcons.find((icon) => icon.name === iconName);
    if (icon) {
      return React.createElement(icon.component);
    }
    return <FaBook />; // Default icon if not found
  };

  // Format image URL for display
  const getImageUrl = (path) => {
    // If it's a full URL, return as is
    if (path && (path.startsWith("http://") || path.startsWith("https://"))) {
      return path;
    }
    // Otherwise, assume it's a relative path and prepend the base URL
    return path ? `http://localhost:8080${path}` : null;
  };

  // Check if a question is a multiple choice question
  const isMultipleChoice = (question) => {
    return question.typeName === "Multiple Choice";
  };

  // Check if a question is a fill in blank question
  const isFillInBlank = (question) => {
    return question.typeName === "Fill in Blank";
  };

  // Check if an option is selected for a question
  const isOptionSelected = (questionId, optionId) => {
    const selection = selectedCorrectAnswers[questionId];

    if (Array.isArray(selection)) {
      return selection.includes(optionId);
    }

    return selection === optionId;
  };

  // Check if test is a listening test
  const isListeningTest = () => {
    return test?.typeName === "LISTENING";
  };

  // Handle part icon change
  const handlePartIconChange = (partIndex, iconName) => {
    setTest((prev) => ({
      ...prev,
      testParts: prev.testParts.map((part, i) =>
        i === partIndex ? { ...part, icon: iconName } : part
      ),
    }));
  };

  // Update cancel handler to check for changes first
  const handleCancel = () => {
    // Check if there are any changes
    const hasChanges = JSON.stringify(test) !== JSON.stringify(originalTest);

    if (!hasChanges) {
      setIsEditing(false);
      toast.success("No changes to discard", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#10B981",
          color: "#fff",
        },
      });
      return;
    }

    // Only show modal if there are changes
    setShowCancelModal(true);
  };

  // Add confirm cancel handler
  const handleConfirmCancel = () => {
    setTest(JSON.parse(JSON.stringify(originalTest)));
    // Reset selected correct answers
    const initialSelections = {};
    originalTest.testParts.forEach((part) => {
      part.questions.forEach((question) => {
        if (question.correctAnswer) {
          if (question.typeName === "Multiple Choice") {
            initialSelections[question.id] = question.correctAnswer.split(",");
          } else {
            initialSelections[question.id] = question.correctAnswer;
          }
        }
      });
    });
    setSelectedCorrectAnswers(initialSelections);
    setIsEditing(false);
    setShowCancelModal(false);
  };

  // Update the question type change handler
  const handleQuestionTypeChange = (partIndex, questionIndex, typeId) => {
    const newTypeName =
      questionTypes.find((type) => type.id === typeId)?.name || "";

    // Only update the type information, preserve other data
    handleQuestionChange(partIndex, questionIndex, "typeId", typeId);
    handleQuestionChange(partIndex, questionIndex, "typeName", newTypeName);
  };

  // Update delete handler
  const handleDelete = async () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch(`http://localhost:8080/api/tests/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete test");
      }

      toast.success("Test deleted successfully!");
      navigate("/dashboard?tab=test-management");
    } catch (err) {
      toast.error("Failed to delete test. Please try again.");
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // Add new part
  const handleAddPart = () => {
    const newPart = {
      name: "New Part",
      description: "",
      icon: "FaBook", // Default icon
      questions: [], // Initialize empty questions array
      audioUrl: "",
      imageUrl: "",
      videoUrl: "",
      order: test.testParts.length + 1, // Set order to next number in sequence
      duration: 0, // Initialize duration to 0
      isDeleted: false, // Initialize isDeleted flag
    };

    setTest((prev) => {
      const updatedParts = [...prev.testParts, newPart];
      const newDuration = calculateTotalDuration(updatedParts);

      return {
        ...prev,
        testParts: updatedParts,
        duration: newDuration,
      };
    });
  };

  // Handle part deletion
  const handleDeletePart = (partOrder) => {
    setTest((prev) => {
      const updatedParts = prev.testParts.map((part) =>
        part.order === partOrder
          ? {
              ...part,
              isDeleted: true,
              questions: part.questions.map((q) => ({ ...q, isDeleted: true })),
            }
          : part
      );

      // Recalculate duration after part deletion
      const newDuration = calculateTotalDuration(updatedParts);

      return {
        ...prev,
        testParts: updatedParts,
        duration: newDuration,
      };
    });
  };

  // Handle undo delete
  const handleUndoDelete = (partOrder) => {
    setTest((prev) => {
      const updatedParts = prev.testParts.map((part) =>
        part.order === partOrder
          ? {
              ...part,
              isDeleted: false,
              questions: part.questions.map((q) => ({
                ...q,
                isDeleted: false,
              })),
            }
          : part
      );

      // Recalculate duration after undoing deletion
      const newDuration = calculateTotalDuration(updatedParts);

      return {
        ...prev,
        testParts: updatedParts,
        duration: newDuration,
      };
    });
  };

  // Add refresh levels function
  const refreshLevels = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/test-levels");
      if (!response.ok) {
        throw new Error("Failed to fetch levels");
      }
      const data = await response.json();
      setTestLevels(data);
      toast.success("Levels refreshed successfully");
    } catch (error) {
      toast.error("Failed to refresh levels");
      console.error("Error refreshing levels:", error);
    }
  };

  // Add new question
  const handleAddQuestion = (partOrder) => {
    const part = test.testParts.find((part) => part.order === partOrder);
    if (!part) return;

    // Find the highest order number among all questions
    const highestOrder = Math.max(...part.questions.map((q) => q.order), 0);

    const newQuestion = {
      typeId: 1, // Default to first question type
      typeName: questionTypes[0]?.name || "Multiple Choice",
      title: "New Question",
      questionInstruction: "",
      answerInstruction: "",
      questionText: "",
      readingPassage: "",
      correctAnswer: "",
      questionOptions: [],
      imageUrl: "",
      order: highestOrder + 1, // Set order to highest existing order + 1
    };

    setTest((prev) => ({
      ...prev,
      testParts: prev.testParts.map((part) =>
        part.order === partOrder
          ? {
              ...part,
              questions: [...(part.questions || []), newQuestion],
            }
          : part
      ),
    }));
  };

  // Handle question deletion
  const handleDeleteQuestion = (partOrder, questionOrder) => {
    setTest((prev) => {
      const part = prev.testParts.find((p) => p.order === partOrder);
      if (!part) return prev;

      const updatedQuestions = part.questions.map((question) =>
        question.order === questionOrder
          ? { ...question, isDeleted: true }
          : question
      );

      return {
        ...prev,
        testParts: prev.testParts.map((p) =>
          p.order === partOrder ? { ...p, questions: updatedQuestions } : p
        ),
      };
    });
  };

  // Handle undo delete question
  const handleUndoDeleteQuestion = (partOrder, questionOrder) => {
    setTest((prev) => {
      const part = prev.testParts.find((p) => p.order === partOrder);
      if (!part) return prev;

      const updatedQuestions = part.questions.map((question) =>
        question.order === questionOrder
          ? { ...question, isDeleted: false }
          : question
      );

      return {
        ...prev,
        testParts: prev.testParts.map((p) =>
          p.order === partOrder ? { ...p, questions: updatedQuestions } : p
        ),
      };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full transform transition-all">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <FaExclamationCircle className="text-3xl text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Error Loading Test
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchTest}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <FaUndo className="text-sm" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <Toaster
        toastOptions={{
          // Default options for all toasts
          duration: 4000,
          position: "top-right",
          style: {
            background: "#363636",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
          },
          success: {
            style: {
              background: "#10B981",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#10B981",
            },
          },
          error: {
            style: {
              background: "#EF4444",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#EF4444",
            },
          },
        }}
      />
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleConfirmDelete={handleConfirmDelete}
        deleting={deleting}
      />

      <CancelModal
        showModal={showCancelModal}
        setShowModal={setShowCancelModal}
        onConfirm={handleConfirmCancel}
      />

      <SaveModal
        showModal={showSaveModal}
        setShowModal={setShowSaveModal}
        onConfirm={handleConfirmSave}
        saving={saving}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard?tab=test-management")}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaArrowLeft className="text-xl" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {isEditing ? "Edit Test" : test.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full flex items-center">
                  {test.typeName}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {test.testLevel}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full flex items-center">
                  <FaRegClock className="mr-1 text-xs" /> {test.duration} mins
                </span>
                {test.ratings >= 0 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full flex items-center">
                    <FaStar className="mr-1 text-yellow-500 text-xs" />{" "}
                    {test.ratings}
                    {test.reviewCount >= 0 && (
                      <span className="ml-1 text-xs text-gray-500">
                        ({test.reviewCount})
                      </span>
                    )}
                  </span>
                )}
                {test.views && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full flex items-center">
                    <FaEye className="mr-1 text-xs" /> {test.views}
                  </span>
                )}
                {test.lastUpdated && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full flex items-center">
                    <FaRegCalendarAlt className="mr-1 text-xs" />{" "}
                    {new Date(test.lastUpdated).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`px-4 py-2 bg-emerald-600 text-white rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors ${
                    saving ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave /> Save Changes
                    </>
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className={`px-4 py-2 bg-gray-200 text-gray-800 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors ${
                    saving ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  <FaTimes /> Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className={`px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors ${
                    deleting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {deleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <FaTrash /> Delete Test
                    </>
                  )}
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors"
                >
                  <FaEdit /> Edit Test
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap border-b border-gray-200">
            <button
              onClick={() => setActiveTab("cover")}
              className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "cover"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FaCamera /> Cover Image
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "details"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FaBook /> Test Details
            </button>
            <button
              onClick={() => setActiveTab("instructor")}
              className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "instructor"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FaUser /> Instructor
            </button>
            <button
              onClick={() => setActiveTab("parts")}
              className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "parts"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FaListUl /> Test Parts
            </button>
            <button
              onClick={() => setActiveTab("questions")}
              className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "questions"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FaComment /> Questions
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "reviews"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FaStar /> Reviews
            </button>
          </div>
        </div>

        {/* Tab Content with Animations */}
        <div className="relative">
          <div
            className={`transition-all duration-300 ease-in-out ${
              activeTab === "cover"
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4 absolute"
            }`}
          >
            {activeTab === "cover" && (
              <CoverImage
                test={test}
                originalTest={originalTest}
                isEditing={isEditing}
                handleChange={handleChange}
                setTest={setTest}
                getImageUrl={getImageUrl}
                setImageFiles={setImageFiles}
              />
            )}
          </div>

          <div
            className={`transition-all duration-300 ease-in-out ${
              activeTab === "details"
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4 absolute"
            }`}
          >
            {activeTab === "details" && (
              <TestDetails
                test={test}
                originalTest={originalTest}
                isEditing={isEditing}
                handleChange={handleChange}
                handleArrayChange={handleArrayChange}
                handleAddArrayItem={handleAddArrayItem}
                handleRemoveArrayItem={handleRemoveArrayItem}
                sortedTestTypes={sortedTestTypes}
                sortedLanguages={sortedLanguages}
                filteredTestLevels={filteredTestLevels}
                setTest={setTest}
                refreshLevels={refreshLevels}
              />
            )}
          </div>

          <div
            className={`transition-all duration-300 ease-in-out ${
              activeTab === "instructor"
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4 absolute"
            }`}
          >
            {activeTab === "instructor" && (
              <TestInstructor
                test={test}
                originalTest={originalTest}
                isEditing={isEditing}
                handleChange={handleChange}
                setTest={setTest}
                setImageFiles={setImageFiles}
              />
            )}
          </div>

          <div
            className={`transition-all duration-300 ease-in-out ${
              activeTab === "parts"
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4 absolute"
            }`}
          >
            {activeTab === "parts" && (
              <TestParts
                test={test}
                isEditing={isEditing}
                expandedParts={expandedParts}
                togglePart={togglePart}
                handlePartChange={handlePartChange}
                handlePartIconChange={handlePartIconChange}
                handleAddPart={handleAddPart}
                handleDeletePart={handleDeletePart}
                handleUndoDelete={handleUndoDelete}
                availableIcons={availableIcons}
                getIconComponent={getIconComponent}
                isListeningTest={isListeningTest}
                getImageUrl={getImageUrl}
                originalTest={originalTest}
                setImageFiles={setImageFiles}
              />
            )}
          </div>

          <div
            className={`transition-all duration-300 ease-in-out ${
              activeTab === "questions"
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4 absolute"
            }`}
          >
            {activeTab === "questions" && (
              <TestQuestions
                test={test}
                originalTest={originalTest}
                isEditing={isEditing}
                expandedQuestions={expandedQuestions}
                toggleQuestion={toggleQuestion}
                handleQuestionChange={handleQuestionChange}
                handleQuestionTypeChange={handleQuestionTypeChange}
                handleOptionChange={handleOptionChange}
                handleSingleChoiceSelection={handleSingleChoiceSelection}
                handleMultipleChoiceSelection={handleMultipleChoiceSelection}
                handleFillInBlankChange={handleFillInBlankChange}
                selectedCorrectAnswers={selectedCorrectAnswers}
                sortedQuestionTypes={sortedQuestionTypes}
                getIconComponent={getIconComponent}
                getImageUrl={getImageUrl}
                isMultipleChoice={isMultipleChoice}
                isFillInBlank={isFillInBlank}
                isOptionSelected={isOptionSelected}
                handleAddQuestion={handleAddQuestion}
                handleDeleteQuestion={handleDeleteQuestion}
                handleUndoDeleteQuestion={handleUndoDeleteQuestion}
                setImageFiles={setImageFiles}
              />
            )}
          </div>

          <div
            className={`transition-all duration-300 ease-in-out ${
              activeTab === "reviews"
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4 absolute"
            }`}
          >
            {activeTab === "reviews" && (
              <TestReviews test={test} setTest={setTest} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetailAdmin;
