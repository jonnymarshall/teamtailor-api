class Teamtailor
  include HTTParty
  base_uri 'https://api.teamtailor.com/'

  def initialize(type)
    @options = {
      headers: {
        "Authorization" => ENV["TEAMTAILOR_API_KEY"],
        "X-Api-Version" => "20161108"
      }
    }
    @type = type
  end

  def run_query
    self.class.get("/v1/#{@type}", @options)
  end

  def log_result
    self.run_query.request.last_uri.to_s
  end
end