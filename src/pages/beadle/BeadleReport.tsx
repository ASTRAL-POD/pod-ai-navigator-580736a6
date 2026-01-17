import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  FileText, 
  Upload, 
  CheckCircle2,
  Search,
  Calendar,
  MapPin,
  AlertTriangle,
  Mic,
  Image,
  Video,
  File,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import MinimalistCenterLayout from '@/components/layout/MinimalistCenterLayout';
import BackButton from '@/components/navigation/BackButton';

const steps = [
  { id: 1, label: 'Student', icon: User },
  { id: 2, label: 'Details', icon: FileText },
  { id: 3, label: 'Evidence', icon: Upload },
  { id: 4, label: 'Review', icon: CheckCircle2 },
];

const locations = [
  'Classroom 101', 'Classroom 102', 'Classroom 103',
  'Gymnasium', 'Cafeteria', 'Library', 
  'Hallway A', 'Hallway B', 'Playground',
  'Computer Lab', 'Science Lab', 'Art Room'
];

const mockStudents = [
  { id: 1, name: 'Juan Santos', grade: 'Grade 9-A' },
  { id: 2, name: 'Maria Garcia', grade: 'Grade 9-B' },
  { id: 3, name: 'Pedro Reyes', grade: 'Grade 9-A' },
  { id: 4, name: 'Ana Cruz', grade: 'Grade 10-A' },
];

const BeadleReport = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isEmergency, setIsEmergency] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<typeof mockStudents[0] | null>(null);
  const [severity, setSeverity] = useState(3);
  const [description, setDescription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; type: string }[]>([]);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
  });

  const filteredStudents = mockStudents.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    setShowSuccess(true);
  };

  const handleFileUpload = () => {
    // Simulate file upload
    const newFile = { name: `evidence_${Date.now()}.jpg`, type: 'image' };
    setUploadedFiles([...uploadedFiles, newFile]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  return (
    <MinimalistCenterLayout>
      <div className="max-w-3xl mx-auto">
        <BackButton dashboardPath="/beadle/dashboard" />

        {/* Header with Emergency Toggle */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`mt-6 mb-6 flex items-center justify-between p-4 rounded-2xl ${
            isEmergency 
              ? 'bg-red-50 border-2 border-red-300' 
              : 'bg-white/70 backdrop-blur border border-white/40'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isEmergency ? 'bg-red-100' : 'bg-primary/10'
            }`}>
              <FileText className={`w-6 h-6 ${isEmergency ? 'text-red-600' : 'text-primary'}`} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {isEmergency ? '🚨 Emergency Report' : 'Incident Report'}
              </h1>
              <p className="text-sm text-muted-foreground">Step {currentStep} of 4</p>
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm text-muted-foreground">Emergency</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={isEmergency}
                onChange={(e) => setIsEmergency(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-colors ${
                isEmergency ? 'bg-red-500' : 'bg-gray-300'
              }`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  isEmergency ? 'translate-x-5' : ''
                }`}></div>
              </div>
            </div>
          </label>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <div className="h-1 bg-gray-200 rounded-full">
              <motion.div
                className={`h-full rounded-full ${isEmergency ? 'bg-red-500' : 'bg-primary'}`}
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex justify-between mt-4">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    currentStep >= step.id
                      ? isEmergency ? 'bg-red-500 text-white' : 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs mt-2 text-muted-foreground">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`bg-white/70 backdrop-blur-xl border rounded-3xl p-6 lg:p-8 shadow-xl ${
              isEmergency ? 'border-red-200' : 'border-white/40'
            }`}
          >
            {/* Step 1: Student Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Search className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Select Student</h2>
                  <p className="text-muted-foreground mt-2">Search for the student involved</p>
                </div>

                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name..."
                    className="w-full pl-12 pr-4 py-4 bg-white border border-border rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    disabled={isAnonymous}
                  />
                </div>

                {searchQuery && !isAnonymous && (
                  <div className="bg-white rounded-xl border border-border overflow-hidden">
                    {filteredStudents.map((student) => (
                      <motion.button
                        key={student.id}
                        whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                        onClick={() => setSelectedStudent(student)}
                        className={`w-full flex items-center gap-4 p-4 text-left border-b last:border-b-0 ${
                          selectedStudent?.id === student.id ? 'bg-primary/5' : ''
                        }`}
                      >
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.grade}</p>
                        </div>
                        {selectedStudent?.id === student.id && (
                          <CheckCircle2 className="w-5 h-5 text-primary ml-auto" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                )}

                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => {
                      setIsAnonymous(e.target.checked);
                      if (e.target.checked) setSelectedStudent(null);
                    }}
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/20"
                  />
                  <div>
                    <span className="font-medium text-foreground">Skip for Anonymous Report</span>
                    <p className="text-sm text-muted-foreground">Submit without identifying the student</p>
                  </div>
                </label>
              </div>
            )}

            {/* Step 2: Event Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Event Details</h2>
                  <p className="text-muted-foreground mt-2">Provide information about the incident</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Time</label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                    >
                      <option value="">Select location</option>
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Severity</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <motion.button
                        key={level}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSeverity(level)}
                        className={`w-12 h-12 rounded-xl font-bold transition-colors ${
                          severity >= level
                            ? level <= 2 ? 'bg-emerald-500 text-white' 
                              : level <= 3 ? 'bg-amber-500 text-white'
                              : 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {level}
                      </motion.button>
                    ))}
                    <span className="ml-4 text-sm text-muted-foreground">
                      {severity <= 2 ? 'Minor' : severity <= 3 ? 'Moderate' : 'Severe'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                  <div className="relative">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe what happened..."
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                    <span className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                      {description.length}/500
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsRecording(!isRecording)}
                  className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl border-2 border-dashed transition-colors ${
                    isRecording 
                      ? 'border-red-500 bg-red-50 text-red-600' 
                      : 'border-primary/30 text-primary hover:bg-primary/5'
                  }`}
                >
                  <Mic className={`w-5 h-5 ${isRecording ? 'animate-pulse' : ''}`} />
                  {isRecording ? 'Recording... Click to stop' : 'Voice Input'}
                </motion.button>
              </div>
            )}

            {/* Step 3: Evidence Upload */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Upload Evidence</h2>
                  <p className="text-muted-foreground mt-2">Add photos, videos, or documents</p>
                </div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  onClick={handleFileUpload}
                  className="border-2 border-dashed border-primary/30 rounded-2xl p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  <Upload className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground">Drag files here or click to browse</p>
                  <p className="text-sm text-muted-foreground mt-2">Supported: JPG, PNG, MP4, PDF (max 10MB)</p>
                </motion.div>

                {uploadedFiles.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {uploadedFiles.map((file, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative bg-gray-100 rounded-xl p-4 flex flex-col items-center"
                      >
                        <button
                          onClick={() => removeFile(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                        {file.type === 'image' ? (
                          <Image className="w-10 h-10 text-gray-400 mb-2" />
                        ) : file.type === 'video' ? (
                          <Video className="w-10 h-10 text-gray-400 mb-2" />
                        ) : (
                          <File className="w-10 h-10 text-gray-400 mb-2" />
                        )}
                        <span className="text-xs text-muted-foreground truncate max-w-full">
                          {file.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-center gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-colors"
                  >
                    <Image className="w-5 h-5" />
                    Camera
                  </motion.button>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Review & Submit</h2>
                  <p className="text-muted-foreground mt-2">Please verify all information</p>
                </div>

                <div className="space-y-4">
                  {/* Student Section */}
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">Student</span>
                      <button onClick={() => setCurrentStep(1)} className="text-sm text-primary">Edit</button>
                    </div>
                    <p className="font-medium text-foreground">
                      {isAnonymous ? 'Anonymous Report' : selectedStudent?.name || 'Not selected'}
                    </p>
                    {selectedStudent && !isAnonymous && (
                      <p className="text-sm text-muted-foreground">{selectedStudent.grade}</p>
                    )}
                  </div>

                  {/* Event Details Section */}
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">Event Details</span>
                      <button onClick={() => setCurrentStep(2)} className="text-sm text-primary">Edit</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Date:</span>
                        <span className="ml-2 font-medium">{formData.date || 'Not set'}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Time:</span>
                        <span className="ml-2 font-medium">{formData.time || 'Not set'}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <span className="ml-2 font-medium">{formData.location || 'Not set'}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Severity:</span>
                        <span className={`ml-2 font-medium ${
                          severity <= 2 ? 'text-emerald-600' : severity <= 3 ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {severity}/5
                        </span>
                      </div>
                    </div>
                    {description && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <span className="text-sm text-muted-foreground">Description:</span>
                        <p className="text-sm mt-1">{description}</p>
                      </div>
                    )}
                  </div>

                  {/* Evidence Section */}
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">Evidence</span>
                      <button onClick={() => setCurrentStep(3)} className="text-sm text-primary">Edit</button>
                    </div>
                    <p className="font-medium text-foreground">
                      {uploadedFiles.length} file(s) attached
                    </p>
                  </div>

                  {isEmergency && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <span className="text-sm font-medium text-red-700">
                        This will be flagged as an emergency report
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 flex items-center justify-between"
        >
          {currentStep > 1 ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 border border-border rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </motion.button>
          ) : (
            <div></div>
          )}

          {currentStep < 4 ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-medium text-white transition-colors ${
                isEmergency ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'
              }`}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-medium text-white transition-colors ${
                isEmergency ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              Submit Report
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Report Submitted</h3>
              <p className="text-muted-foreground mb-2">Your report has been successfully filed</p>
              <p className="font-mono text-sm text-primary mb-6">Report ID: INC-2024-0848</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowSuccess(false);
                    setCurrentStep(1);
                    setSelectedStudent(null);
                    setDescription('');
                    setUploadedFiles([]);
                    setFormData({ date: '', time: '', location: '' });
                    setSeverity(3);
                  }}
                  className="flex-1 px-6 py-3 border border-border rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Submit Another
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSuccess(false)}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  View Status
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MinimalistCenterLayout>
  );
};

export default BeadleReport;
