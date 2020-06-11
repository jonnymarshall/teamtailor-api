class FavouritesController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :authenticate_user!

  def index
    respond_to do |format|
      format.html
      format.json { render json: fetch_favourites_for_user }
    end 
  end

  def create
    favourite = Favourite.new(favourite_params)
    favourite.user = current_user
    
    if favourite.save
      render json: { success: favourite }, status: 200
    else
      render json: { error: favourite.errors.messages }, status: 422
    end
  end

  def destroy
    favourite = Favourite.find_by(job_id: params[:job_id])
    
    if favourite.destroy
      render json: { success: favourite }, status: 200
    else
      render json: { error: favourite.errors.messages }, status: 422
    end
  end

  private

  def favourite_params
    params.permit(:job_id)
  end

  def fetch_favourites_for_user
    favourites = Favourite.where(user: current_user)
    FavouriteSerializer.new(favourites).serialized_json
  end
end
