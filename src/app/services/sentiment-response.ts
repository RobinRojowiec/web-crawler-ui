export class SentimentResponse {
    predicted_class: String;
    detailed_probabilities: {
        negative: String,
        positive: String
    }
}
