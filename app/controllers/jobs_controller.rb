class JobsController < ApplicationController
  respond_to :html, :json
  before_action :authenticate_user!

  def index
    respond_to do |format|
      format.html
      format.json {
        render json: fetch_jobs(tailtailor_search_type_params[:type])
      }
    end 
  end

  def show
  end

  private

  def fetch_jobs(type)
    Teamtailor.new(type).run_query
  end

  def tailtailor_search_type_params
    params.permit(:type)
  end
  
end