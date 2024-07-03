// Código específico para uso do localStorage!
// No caso de uso da API, utilizar fetch e ignorar este arquivo.

// Operações bases
function getFeedbacks() {
    let feedbacks = localStorage.getItem('feedbacks');
    feedbacks = JSON.parse(feedbacks) || [];
    return feedbacks;
};
function getFeedbackById(id) {
    let feedbacks = getFeedbacks();
    let feedback = feedbacks.find(f => f.id == id);
    return feedback;
};
function setFeedbacks(feedbacks) {
    feedbacks = JSON.stringify(feedbacks);
    localStorage.setItem('feedbacks', feedbacks);
};


// Operações de CRUD
function addFeedback(feedback) {
    let feedbacks = getFeedbacks();
    feedbacks.push(feedback);
    setFeedbacks(feedbacks);
};
function updateFeedbackById(id, feedback) {
    let feedbacks = getFeedbacks();
    let index = feedbacks.findIndex(f => f.id == id);
    feedbacks[index] = feedback;
    setFeedbacks(feedbacks);
};
function removeFeedback(id) {
    let feedbacks = getFeedbacks();
    feedbacks = feedbacks.filter(f => f.id !== id);
    setFeedbacks(feedbacks);
};