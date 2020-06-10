class JobsController < ApplicationController
  respond_to :json

  def index
    jobs = Teamtailor.new().run_query
    respond_with(jobs)
  end

  def show
  end
end
