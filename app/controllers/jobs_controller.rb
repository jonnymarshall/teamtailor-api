class JobsController < ApplicationController
  respond_to :html, :json

  def index
    respond_to do |format|
      format.html
      format.json { render json: fetch_jobs }
    end 
  end

  def show
  end

  private

  def fetch_jobs
    Teamtailor.new().run_query
  end
  
end